<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'action',
        'subject_type',
        'subject_id',
        'description',
        'changes',
    ];

    protected $casts = [
        'changes' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['subject_name', 'user_name'];

    /**
     * Get the user that owns the activity log.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'System',
            'email' => 'system@example.com',
        ]);
    }

    /**
     * Get the subject of the activity.
     */
    public function subject()
    {
        return $this->morphTo();
    }

    /**
     * Scope a query to only include activities for a specific subject.
     */
    public function scopeForSubject(Builder $query, $subjectType, $subjectId = null): Builder
    {
        $query->where('subject_type', $subjectType);

        if ($subjectId) {
            $query->where('subject_id', $subjectId);
        }

        return $query;
    }

    /**
     * Scope a query to only include activities by a specific user.
     */
    public function scopeForUser(Builder $query, $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include activities of a specific type.
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('action', $type);
    }

    /**
     * Get the subject name for the activity.
     */
    public function getSubjectNameAttribute(): string
    {
        if (!$this->subject_type) {
            return 'System';
        }

        // Map subject types to their model classes
        $modelMap = [
            'free_space' => 'App\\Models\\FreeSpace',
            'user' => 'App\\Models\\User',
            'tenant' => 'App\\Models\\Tenant',
            'vacancy' => 'App\\Models\\Vacancy',
            'service' => 'App\\Models\\Service',
            'gallery' => 'App\\Models\\Gallery',
            'application' => 'App\\Models\\Application',
            'category' => 'App\\Models\\Category',
            'contact' => 'App\\Models\\Contact',
            'department' => 'App\\Models\\Department',
            'event' => 'App\\Models\\Event',
            'news' => 'App\\Models\\News',
            'slider' => 'App\\Models\\Slider',
            'team' => 'App\\Models\\Team',
            'mall' => 'App\\Models\\Mall',
        ];

        $modelClass = $modelMap[$this->subject_type] ?? null;

        if ($modelClass && class_exists($modelClass)) {
            $model = new $modelClass();
            $subject = $model->find($this->subject_id);

            if ($subject) {
                if (method_exists($subject, 'getActivityLogName')) {
                    return $subject->getActivityLogName();
                }
                return class_basename($modelClass) . ' #' . $this->subject_id;
            }
        }

        return ucfirst(str_replace('_', ' ', $this->subject_type)) . ' #' . $this->subject_id;
    }

    /**
     * Get the user name for the activity.
     */
    public function getUserNameAttribute(): string
    {
        return $this->user ? $this->user->name : 'System';
    }

    /**
     * Get the formatted changes attribute.
     */
    public function getFormattedChangesAttribute(): ?array
    {
        if (empty($this->changes)) {
            return null;
        }

        $changes = $this->changes;
        $formatted = [];

        if (isset($changes['old'], $changes['attributes'])) {
            // Format for model updates
            foreach ($changes['attributes'] as $key => $value) {
                $formatted[] = [
                    'field' => $key,
                    'old' => $changes['old'][$key] ?? null,
                    'new' => $value,
                ];
            }
        } else {
            // Format for other changes
            foreach ($changes as $key => $value) {
                if (is_array($value)) {
                    $formatted[] = [
                        'field' => $key,
                        'value' => json_encode($value, JSON_PRETTY_PRINT),
                    ];
                } else {
                    $formatted[] = [
                        'field' => $key,
                        'value' => $value,
                    ];
                }
            }
        }

        return $formatted;
    }
}
