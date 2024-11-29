<script>
import axios from 'axios';

    export default {
        data() {
            return{
                token: '',
                respon: false,
                data: [],
            }
        },
        created() {
            this.token = localStorage.getItem('token');
        },
        mounted() {
            this.fetchConsultation();
        },
        methods: {
            fetchConsultation: async function () {
                try {
                    const headers = {
                        'Authorization' : `Bearer ${this.token}`,
                        'Content-Type' : 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/user/consultation',
                        headers: headers
                    })

                    console.log(response);
                    console.log(response.data.data.length >= 1);
                    this.respon = true;
                    this.data = response.data.data;

                } catch (error) {
                    console.log('Error', error);
                }
            },

            getInitial: function (name) {
                const nameArray = name.split(' ');
                const firstInitial = nameArray[0].charAt(0); // Inisial dari nama depan
                const lastInitial = nameArray[1] ? nameArray[1].charAt(0) : '';

                return `${firstInitial}${lastInitial}`.toUpperCase();
            }
        }
    }
</script>

<template>
    <h1 class="text-2xl font-semibold mb-4 flex flex-row">Konsultasi</h1>

    <div class="">

        <div v-if="respon" v-for="(user, index) in data" :key="index" class="border-b p-1">
            <RouterLink :to="{name: 'konsultasi', params: {id: user.id}}" >
                <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
                    <span class="font-medium text-gray-600 dark:text-gray-300">{{ getInitial(user.name) }}</span>
                </div>
                <span>{{ user.name }}</span>
            </RouterLink>
        </div>

        <div v-else class="">
            <h1>Tidak memiliki konsultasi</h1>
        </div>


    </div>
</template>