<template>
    <div class="mb-8 mt-28 mx-8 box-border">

        <!-- Grid container -->
            <div class="md:grid grid-cols-12 gap-1 mt-10">

                <!-- informasi pendeta -->
                <aside class="col-span-3 bg-slate-100 rounded-md">
                    
                    <div class="px-3 py-3 box-border">

                        <div class="w-4/5 md:w-2/3 md:h-2/3 mx-auto">
                            <img class="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" :src="`http://e-consultationbe.test/storage/photos/${detailUser.photo_user}`" alt="Bordered avatar">
                        </div>

                        <div class="md:w-2/3 mx-auto mt-10 text-slate-600">
                            <p class="text-xl md:text-2xl font-semibold ">Pdt. {{ detailUser.name }} </p>
                            <p class="font-semibold my-1">{{ detailPastor.status_pekerjaan ? detailPastor.status_pekerjaan : '-' }}</p>
                            <p class="font-semibold my-1">{{ detailPastor.spesialisasi ? detailPastor.spesialisasi : '-' }} </p>
                            <p class="font-semibold my-1">{{ detailUser.chruch?.nama_gereja }}</p>
                        </div>
 

                    </div>

                </aside>
                <!-- informasi pendeta -->


                <!-- detail informasi pendeta -->
                <main class="col-span-9">

                    <div class="">

                        <div class="md:w-5/6 mx-auto text-slate-700 mb-7">
                            <h1 class="tex-2xl md:text-3xl font-bold">Biografi</h1>
                            <p class="mt-4">{{ detailPastor.biografi ? detailPastor.biografi : '-' }}</p>
                        </div>
                        <div class="md:w-5/6 mx-auto text-slate-700 mb-7">
                            <h1 class="tex-2xl md:text-3xl font-bold">Pengalaman</h1>
                            <p class="mt-4">{{ detailPastor.pengalaman ? detailPastor.pengalaman : '-' }}</p>
                        </div>

                        <div class="md:w-5/6 mx-auto text-slate-700 mb-7">
                            <h1 class="tex-2xl md:text-3xl font-bold">Jadwal Tersedia</h1>
                            <p class="mt-4">{{ detailPastor.jadwal ? detailPastor.jadwal : '-' }}</p>
                        </div>

                    </div>

                </main>
                <!-- detail informasi pendeta -->


            </div>
        <!-- Grid container -->
        
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        props: ['id'],
        data() {
            return {
                token: '',
                detailUser: {},
                detailPastor: {},
            }
        },
        created(){
            this.token = localStorage.getItem('token');
        },
        mounted(){
            this.fetchUser()
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
                        url: `http://e-consultationbe.test/api/pastor/detail_pastor/${this.id}`,
                        headers: headers
                    });

                    console.log(response.data.data);
                    this.detailUser = response.data.data
                    this.detailPastor = response.data.data.detail_pastor
                } catch (error) {
                    console.log('Error', error);
                }
            }
        }
    }
</script>