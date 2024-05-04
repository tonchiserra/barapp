<template>
  <header>
    <div class="page-width header-container">
      <h1><img src="../assets/logo.png" alt="" height="40" /></h1>

      <nav class="main-menu">
        <ul>
          <li><router-link to="/" class="underline">Inicio</router-link></li>
          <li><router-link to="/cart" class="underline">Carta</router-link></li>
          <li><router-link to="/history" class="underline">Historial</router-link></li>
          <li><router-link to="/balance" class="underline">Balance</router-link></li>
          <li><router-link to="/offers" class="underline">Ofertas</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  header {
    background: #fff;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    border-bottom: 1px solid #c4c4c4;

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .main-menu {
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
      }

      a {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
      }
    }
  }
</style>