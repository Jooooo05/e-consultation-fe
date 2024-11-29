<script>
  import {doc, getDoc, onSnapshot, updateDoc, collection, addDoc, query, orderBy } from 'firebase/firestore';
  import { RouterLink, RouterView } from 'vue-router'
  import Navbar from '@/components/navbar/Navbar.vue'
  import Footer from '@/components/footer/Footer.vue'
  import { 
    initFlowbite,
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips
   } from 'flowbite'

  export default {
    components: {
      Navbar,
      Footer
    },
    data() {
      const base_url = import.meta.env.VITE_API_URL
      return {
        base_url: base_url,
        doc,
        getDoc,
        addDoc,
        onSnapshot,
        updateDoc,
        collection,
        query,
        orderBy
      }
    },
    mounted() {
      initFlowbite();
      initAccordions();
      initCarousels();
      initCollapses();
      initDials();
      initDismisses();
      initDrawers();
      initDropdowns();
      initModals();
      initPopovers();
      initTabs();
      initTooltips();
    },
  }
</script>

<template>
  
  <!-- navbar start -->
    <Navbar v-if="$route.name != 'login' &&  $route.name !='register' && $route.name != 'admin' && $route.name !='cobaadmin' && $route.name != 'admindetailuser'"/>
  <!-- navbar end -->

  <RouterView />


  <!-- footer start --> 
    <Footer v-if="$route.name != 'login' &&  $route.name !='register' && $route.name != 'admin' && $route.name !='cobaadmin' && $route.name != 'profile' && $route.name != 'admindetailuser'"/>
  <!-- footer end -->

</template>

<style scoped>

</style>