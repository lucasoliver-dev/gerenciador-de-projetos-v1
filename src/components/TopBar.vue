<template>
    <div class="topbar d-flex justify-content-between align-items-center">
      <div class="logo">
        <img src="../assets/Logo.png" alt="" sizes="" srcset="">
      </div>
      <div class="search-icon">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.24 17.74L24 22.5L22.5 24L17.74 19.24C16.14 20.34 14.18 21 12 21C7.58 21 4 17.42 4 13C4 8.58 7.58 5 12 5C16.42 5 20 8.58 20 13C20 15.18 19.34 17.14 18.24 18.74ZM12 7C8.69 7 6 9.69 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13C18 9.69 15.31 7 12 7Z" fill="white"/>
        </svg>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'TopBar',
  };
  </script>
  
  <style scoped>
  .topbar {
    width: 100vw;
    height: 80px;
    background-color: #1C1930;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  
  .logo {
    color: white;
    font-family: "Encode Sans Semi Expanded";
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    flex-grow: 1;
  }
  
  .search-icon {
    cursor: pointer;
  }
  </style>
  