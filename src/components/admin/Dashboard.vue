<template>
    <div>
        <div class="">
            <div class="pl-16 pb-2 border-b-2 border-gray-200">
                <h1 class=" font-semibold text-2xl text-slate-700">Dashboard</h1>
            </div>
        </div>


        <!-- main dashboard -->
        <div class="mx-8 mt-10">

            <div class="flex justify-between">
                <div class="w-[250px] py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center gap-4   ">
                    <div class="">
                        <box-icon type='solid' size="lg" name='happy'></box-icon>
                    </div>

                    <div class="">
                        <h3 class="font-bold text-3xl">{{ countUser }}</h3>
                        <span class="text-md">Total User</span>
                    </div>
                </div>
                <div class="w-[250px] py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center gap-4   ">
                    <div class="">
                        <box-icon name='heart' size="lg"></box-icon>
                    </div>

                    <div class="">
                        <h3 class="font-bold text-3xl">50</h3>
                        <span class="text-md">Total Perlawatan</span>
                    </div>
                </div>
                <div class="w-[250px] py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center gap-4   ">
                    <div class="">
                        <box-icon name='church' size="lg"></box-icon>
                    </div>

                    <div class="">
                        <h3 class="font-bold text-3xl">{{ countGereja }}</h3>
                        <span class="text-md">Total Gereja</span>
                    </div>
                </div>
                <div class="w-[250px] py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center gap-4   ">
                    <div class="">
                        <box-icon name='notepad' size="lg" ></box-icon>
                    </div>

                    <div class="">
                        <h3 class="font-bold text-3xl">{{ countBlog }}</h3>
                        <span class="text-md">Total Blog</span>
                    </div>
                </div>


            </div>


            <!-- graphic data -->
             <div class="w-full pt-5 flex gap-10">

                <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800">
                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="@/assets/img/1.png" alt="">
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Konsultasi Bersama Pendeta</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Jalin komunikasi dengan pendeta untuk mendapatkan bimbingan dan nasehat rohani secara online melalui aplikasi ini.</p>
                    </div>
                </div>


             </div>

             <div class="w-full pt-5 flex justify-between"></div>
            <!-- graphic data -->

        </div>
        <!-- main dashboard -->


    </div>
</template>

<script>
    import axios from 'axios';


    export default {
        props: {
            isSidebar: Boolean,
        },
        data() {
            return {
                token: '',
                countUser: 0,
                countGereja: 0,
                countBlog: 0,
            }
        },

        mounted() {
            this.token = localStorage.getItem('token');

            this.totalUser();
            this.totalGereja();
            this.totalBlog();
        },

        methods: {

            totalUser: async function () {
                
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/total_user',
                        headers: headers
                    });

                    this.countUser = response.data.data;
                } catch (error) {
                    console.log('Error', error);
                }

            },

            totalGereja: async function () {
                
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/total_church',
                        headers: headers
                    });

                    this.countGereja = response.data.data;
                } catch (error) {
                    console.log('Error', error);
                }

            },

            totalBlog: async function () {
                
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/total_blog',
                        headers: headers
                    });

                    this.countBlog = response.data.data;
                } catch (error) {
                    console.log('Error', error);
                }

            },

        }
    };
</script>