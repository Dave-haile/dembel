<?php

/**
 * @return \App\Models\User|null
 */
function auth_user()
{
  return auth()->user();
}
