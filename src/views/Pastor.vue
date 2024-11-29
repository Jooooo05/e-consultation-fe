<template>
    <div class="my-8">

        <!-- header -->
        <div class="bg-slate-300 w-full h-[400px]">

            <div class="flex justify-center items-center h-full box-border">
                <div class="text-center md:w-2/5 md:mx-auto">
                    <h1 class="text-4xl font-bold mb-8 text-slate-600">{{ isConsultation ? 'KONSULTASI' : 'PERLAWATAN' }}</h1>

                    <p class="text-slate-600 mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sed odio possimus qui facere perferendis, alias dignissimos tempore eius distinctio nemo consequuntur ab adipisci. Quis nobis sit autem a libero!</p>

                    <RouterLink to="#" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Contact Us</RouterLink>
                </div>
            </div>

        </div>
        <!-- header -->

        <!-- Card pendeta -->
        <div class="mx-5 md:w-5/6 md:mx-auto mt-20">   
            

            <div class="flex flex-row gap-10">

                <div class=" basis-[60%] ">

                    <div class="mb-5 ">
                        <h1 class="text-xl font-semibold text-slate-800">Rekomendasi Pendeta</h1>
                        <p class="text-sm text-slate-800">Konsultasi online dengan pendeta siaga kami</p>
                    </div>

                    <!-- Search -->
                    <div class="my-5">
                        <div class="mx-auto">   
                            <label for="search-pastor" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input v-model="search" type="search" id="search-pastor" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search our Pastor" required />
                            </div>
                        </div>
                    </div>
                    <!-- Search -->

                    <RouterLink v-for="(pastor, index) in allPastor" :key="index" :to="{name: 'detailpastor', params: {id: pastor.id}}" class="flex items-center justify-between hover:bg-gray-100 transition-all rounded my-1 border-b p-1" >

                        <div class="flex items-center">
                            <div class="relative inline-flex items-center justify-center w-14 h-w-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
                                <img class="w-14 h-w-14 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" :src="`http://e-consultationbe.test/storage/photos/${pastor.photo_user}`" alt="Bordered avatar">
                            </div>
                            <div class="">
                                <p class="text-lg text-gray-700">Pdt {{ pastor.name }}</p>
                                <p class="text-xs text-gray-400">{{ pastor.detail_pastor?.spesialisasi }}</p>
                            </div>
                        </div>

                        <div class="">
                            <RouterLink v-if="isConsultation" :to="{name: 'konsultasi', params: { id: pastor.id}}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Konsultasi
                            </RouterLink>
    
                            <RouterLink v-else :to="{name: 'perlawatan', params: { id: pastor.id}}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Order Perlawatan
                            </RouterLink>
                        </div>

                    </RouterLink>

                    <!-- paginate -->
                    <div class="mt-10 w-[150px] mx-auto flex flex-row justify-center">
                        <span @click="prevPage" class="mr-2 btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                            Prev
                        </span>
                        <span @click="nextPage"  class="btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                            Next
                        </span>
                    </div>
                    <!-- paginate -->
                </div>

                <div class="basis-[40%]">
                    <div class="mb-5 border-b pb-3">
                        <h1 class="text-xl font-semibold text-slate-800">Cari Pendeta atau Spesialisasi</h1>
                        <p class="text-sm text-slate-800">Pilih kategori yang tersedia sesuai kondisimu</p>
                    </div>

                    <div>
                        <ul>
                            <li v-for="(kategori, index) in allKategori" :key="index" class="cursor-pointer">
                                <button @click="sortPastorbyKategori(kategori.kategori)" 
                                        class="w-full text-left py-2 px-4 hover:bg-gray-200 border-b border-gray-300">
                                    {{ kategori.kategori }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
        <!-- Card pendeta -->

    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return{
                token: '',
                allPastor: [],
                search: "",
                isConsultation: false,
                // pagination
                currentPage: 1,
                lastPage: 0,

                // kategori pastor
                allKategori: [],

            }
        },

        watch: {
            search(newValue){
                this.fetchAllPastor(newValue);
            },
            '$route.query': 'checkQueryParam',
        },
        created() {
            this.checkQueryParam();
            this.token = localStorage.getItem('token');
        },
        mounted() {
            this.fetchAllPastor();
            this.fetchKategoriPastor();
        },
        methods: {
            checkQueryParam() {
                this.isConsultation = this.$route.query.isConsultation === 'true';
            },
            fetchAllPastor: async function(query = '') {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const params = {
                        name: query,
                        page: this.currentPage
                    };

                    const responseAllPastor = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/pastor',
                        headers: headers,
                        params: params
                    });

                    console.log(responseAllPastor.data.data);
                    this.allPastor = responseAllPastor.data.data.data;
                    this.currentPage = responseAllPastor.data.data.current_page;
                    this.lastPage = responseAllPastor.data.data.last_page;
                } catch (error) {
                    console.log('Error', error);
                }
            },

            nextPage() {
                if(this.currentPage < this.lastPage){
                    this.currentPage++;
                } 
                this.fetchAllPastor()
            },

            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
                this.fetchAllPastor()
            },

            truncateWords(text, limit) {
                if (!text) return '...';
                const words = text.split(' ');
                if (words.length <= limit) return text;
                return words.slice(0, limit).join(' ') + '...';
            },

            // kategori pastor
            fetchKategoriPastor: async function()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                    }

                    // const params = {
                    //     kategori: kategori,
                    //     page: this.currentPageKategori
                    // }

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/kategori/pastor',
                        headers: headers,
                    });
                    
                    this.allKategori = response.data.data.data;
                    // this.currentPageKategori = response.data.data.current_page;
                    // this.lastPageKategori = response.data.data.last_page;
                } catch (error) {
                    console.log('Error', error);
                }

            },

            // search pastor by kategori
            sortPastorbyKategori: async function (kategori)
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                    }

                    const data = {
                        kategori : kategori
                    }

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/pastor/kategori',
                        params: data,
                        headers: headers,
                    });
                    this.allPastor = response.data
                } catch (error) {
                    console.log('error', error);
                }
            }

        },
    }
</script>