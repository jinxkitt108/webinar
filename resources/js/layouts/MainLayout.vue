<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/home">
            <a class="nav-link">Home</a>
          </router-link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/students">
            <a class="nav-link">Student</a>
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>