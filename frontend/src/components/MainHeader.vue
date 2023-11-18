<template>
  <header>
    <div class="page-width header-container">
      <h1>Barapp</h1>

      <nav class="main-menu">
        <ul>
          <li><a href="" class="underline">Inicio</a></li>
          <li><a href="" class="underline">Carta</a></li>
          <li><a href="" class="underline">Balance</a></li>
          <li><a href="" class="underline">Ofertas</a></li>
          <li><a href="" class="underline">Historial</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  header {
    background: #fff;
    width: 100%;

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
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
      }
    }
  }
</style>