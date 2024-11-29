<script>
import axios from 'axios';

    export default {
        data() {
            return {
                token: '',
                id: 0,
                allPerlawatan: [],
            }
        },
        created() {
            this.token = localStorage.getItem('token');
            
        },
        mounted() {
            this.profileUser();
        },

        methods: {
            fetchNotif: async function() {
                try {
                const headers = {
                    'Authorization' : `Bearer ${this.token}`,
                };

                const response = await axios({
                    method: 'get',
                    url: `http://e-consultationbe.test/api/perlawatan_user/${this.id}`,
                    headers: headers
                });
                console.log(response.data.data);
                console.log('data udah kepanggil semua kok');
                
                this.allPerlawatan = response.data.data
                } catch (error) {
                    console.log('Error', error);
                    
                }
            },

            profileUser: async function () {
                try {

                const user = await axios.get('http://e-consultationbe.test/api/me', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                this.id = user.data.data.id;

                this.fetchNotif();

                }catch (error) {
                console.error('error : ', error)
                }
            },
        }
    }
</script>

<template>
    <h1 class="text-2xl font-semibold mb-4 flex flex-row"><box-icon size="md" type='solid' name='bell'></box-icon>Notification</h1>
    
    <div v-for="(perlawatan, index) in allPerlawatan" :key="index" :class="perlawatan.confirm_pastor == 1 ? 'text-green-800 border border-green-300 bg-green-50' : (perlawatan.cancel_perlawatan == 1 ? 'text-red-800 border border-red-300 bg-red-50' : 'text-blue-800 border border-blue-300 bg-blue-50') " class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 mr-8" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Perlawatan</span>
        <div>
            <span class="font-medium">Jadwal perlawatan :</span>
            <ul class="mt-1.5 list-disc list-inside">
                <li>Nama pastor : {{ perlawatan.pastor?.name }}</li>
                <li>Nama user : {{ perlawatan.user?.name }}</li>
                <li>Jadwal : {{ perlawatan.tanggal_perlawatan }}</li>
                <li>Status : {{ perlawatan.confirm_pastor == 1 ? 'Diterima' : (perlawatan.cancel_perlawatan == 1 ? 'Ditolak' : 'Harap tunggu respon pastor') }}</li>
                <li v-if="perlawatan.cancel_perlawatan"> Alasan : {{ perlawatan?.reason_cancel }}</li>
            </ul>
        </div>
    </div>
</template>