<?php

namespace App\Models\Traits;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

trait LogsActivity
{
    public static function bootLogsActivity(): void
    {
        static::created(function ($model) {
            $model->recordActivity('created');
        });

        static::updated(function ($model) {
            $model->recordActivity('updated');
        });

        static::deleted(function ($model) {
            $model->recordActivity('deleted');
        });
    }

    protected function recordActivity(string $action): void
    {
        try {
            $userId = optional(Auth::user())->id;

            $changes = null;
            if ($action === 'updated') {
                $dirty = $this->getDirty();
                if (!empty($dirty)) {
                    $before = [];
                    foreach (array_keys($dirty) as $key) {
                        $before[$key] = $this->getOriginal($key);
                    }
                    $changes = [
                        'before' => $before,
                        'after' => $dirty,
                    ];
                }
            }

            $subjectLabel = $this->getActivitySubjectLabel();

            ActivityLog::create([
                'user_id' => $userId,
                'action' => $action,
                'subject_type' => Str::afterLast(static::class, '\\'),
                'subject_id' => $this->getKey(),
                'description' => ucfirst($action) . ' ' . strtolower($subjectLabel),
                'changes' => $changes,
            ]);
        } catch (\Throwable $e) {
            // Swallow logging errors to not affect main flow.
        }
    }

    protected function getActivitySubjectLabel(): string
    {
        $nameLike = $this->name
            ?? $this->title
            ?? $this->title_en
            ?? $this->id;
        return sprintf('%s "%s"', class_basename($this), $nameLike);
    }
}
