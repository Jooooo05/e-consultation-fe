<template>
    <div class="mb-8 mt-24 mx-8 box-border">
        
        <!-- informasi pastor -->
        <div class="w-4/5 lg:w-1/4 mx-auto px-3 py-3 box-border">

            <div class=" md:w-2/4 lg:w-3/4 mx-auto ">
                <img class="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" :src="`http://e-consultationbe.test/storage/photos/${pastor.photo_user}`" alt="Bordered avatar">
            </div>

            <div class="mt-8">
                <h1 class="text-center text-slate-600 text-base md:text-lg font-semibold">Pdt. {{ pastor.name }}</h1>
            </div>
            
        </div>
        <!-- informasi pastor -->

        <!-- succes order card -->
        <div v-if="succes_order" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div class="absolute top-1/2 left-1/2 p-6 transform -translate-x-1/2 -translate-y-1/2  max-w-[480px] w-full h-[200px] bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <div class="">
                    <div class="text-center mt-14" role="alert">
                        <strong class="font-bold mr-1">Success!</strong>
                        <span class="block sm:inline">Your order perlawatan has been placed successfully.</span>
                    </div>
                    <div class="text-center">
                        <box-icon size="lg" color="green" name='check-double'></box-icon>
                    </div>
                </div>
            </div>
        </div>
        <!-- succes order card -->

        <!-- form perlawatan -->
        <div class=" mx-7 md:w-5/6 md:mx-auto">
            <form action="">

                <!-- username -->
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <div class="flex mb-6">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                    </span>
                    <input v-model="userName" type="text" id="username" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" disabled>
                </div>
                <!-- username -->

                <!-- alamat user -->
                <div v-if="midleware" class="px-2 py-3 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    Please complete your personal data first on the profile page!
                </div>
                <label for="alamat_user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                <div class="relative mb-6">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg :class=" midleware ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    </div>
                    <input v-model="alamatUser" type="text" id="alamat_user" :class=" midleware ? 'border-2 border-red-300 text-red-500' : 'border-gray-300 text-gray-900'" class="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jl. Kumaudin" disabled>
                </div>
                <!-- alamat user -->

                <!-- tanggal perlawatan -->
                <label for="tanggal_perlawatan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal perlawatan</label>
                <div class="relative mb-4">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input v-model="tanggal_perlawatan" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                </div>
                <!-- tanggal perlawatan -->


                <button v-if="midleware" type="button" class="w-full text-white bg-red-300 dark:bg-red-400 cursor-not-allowed font-medium rounded-full text-sm px-5 py-2.5 text-center" disabled>Submit</button>
                <button v-else type="button" @click="orderPerlawatan" class="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >Submit</button>

            </form>
        </div>
        <!-- form perlawatan -->
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

    export default{
        props: ['id'],
        data(){
            return {
                token: '',

                midleware: false,

                // user
                userName: '',
                alamatUser: '',
                pastor: {},

                // data
                tanggal_perlawatan: '',
                userId: 0,
                pastorId: 0,

                succes_order: false,
            }
        },

        created()
        {
            this.token = localStorage.getItem('token');
            this.fetchUser();
            this.fetchPastor();
        },

        mounted()
        {

        },

        methods: {

            fetchUser: async function () {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/me',
                        headers: headers
                    });
                    
                    console.log(response.data.data);
                    this.userId = response.data.data.id;
                    this.userName = response.data.data.name;
                    if(response.data.data.alamat == null){
                        this.midleware = true
                    }else{
                        this.alamatUser = response.data.data.alamat;
                    }
                } catch (error) {
                    
                }
            },

            fetchPastor: async function () {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: `http://e-consultationbe.test/api/profile_user/${this.id}`,
                        headers: headers
                    });

                    console.log(response.data.data);
                    this.pastorId = response.data.data.id;
                    this.pastor = response.data.data;
                } catch (error) {
                    
                }
            },

            orderPerlawatan: async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const data = {
                        user_id: this.userId,
                        pastor_id: this.pastorId,
                        tanggal_perlawatan: this.tanggal_perlawatan
                    };

                    const response = await axios({
                        method: 'post',
                        url: 'http://e-consultationbe.test/api/perlawatan',
                        headers: headers,
                        data: data,
                    });

                    this.succes_order = true;

                    setTimeout(() => {
                        this.succes_order = false;
                        router.push({ name: 'profile'});
                    }, 1500);
                } catch (error) {
                    console.log('Error', error);
                }
            }
        }
    }


</script>