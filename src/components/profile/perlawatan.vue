<script>
import axios from 'axios';

    export default {
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                token: '',
                idPastor: 0,
                allPerlawatan: [],
                confirmReject: false,
                alasan: '',
                idPerlawatan: 0,
                confirmApprove: false,
            }
        },
        created() {
            this.token = localStorage.getItem('token');
        },
        mounted() {
            this.fetchPerlawatan();
            console.log('hallo');
            
        },
        methods: {
            fetchPerlawatan: async function() {
                try {
                const headers = {
                    'Authorization' : `Bearer ${this.token}`,
                };

                const response = await axios({
                    method: 'get',
                    url: `http://e-consultationbe.test/api/perlawatan_pastor/${this.id}`,
                    headers: headers
                });
                console.log(response.data.data);
                
                this.allPerlawatan = response.data.data
                } catch (error) {
                    console.log('Error', error);
                    
                }
            },
            btnReject: function(id) {
                this.confirmReject = true;
                this.idPerlawatan = id;
                
            },
            btnApprove: function(id) {
                this.confirmApprove = true;
                this.idPerlawatan = id;
            },
            btnCloseReject: function() {
                this.confirmReject = false;
            },
            btnCloseApprove: function() {
                this.confirmApprove = false;
            },
            clear: function() {
                this.alasan = '';
                this.confirm_pastor = 0;
                this.cancel_perlawatan = 0;
                this.idPerlawatan = 0;
            },
            rejectPerlawatan: async function() {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const dataToUpdate = {
                        confirm_pastor: 0,
                        cancel_perlawatan: 1,
                        reason_cancel: this.alasan,
                    };

                    const response = await axios({
                        method: 'patch',    
                        url: `http://e-consultationbe.test/api/perlawatan/${this.idPerlawatan}`,
                        headers: headers,
                        data: dataToUpdate,
                    });

                        console.log(response.data);
                        alert(response.data.message);
                }catch(error) {
                    console.log('Error', error);
                }
                this.fetchPerlawatan();
                this.btnCloseReject();
                this.clear();
            },
            approvePerlawatan: async function() {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const dataToUpdate = {
                        confirm_pastor: 1,
                        cancel_perlawatan: 0,
                    };

                    const response = await axios({
                        method: 'patch',    
                        url: `http://e-consultationbe.test/api/perlawatan/active/${this.idPerlawatan}`,
                        headers: headers,
                        data: dataToUpdate,
                    });

                        console.log(response.data);
                        alert(response.data.message);
                }catch(error) {
                    console.log('Error', error);
                }
                this.fetchPerlawatan();
                this.btnCloseApprove();
                this.clear();
            }
            
        },
    }
</script>

<template>
    <h1 class="text-2xl font-semibold mb-4 flex flex-row">Perlawatan</h1>

    <div v-for="(perlawatan, index) in allPerlawatan" :key="index" id="alert-additional-content-1"
    :class="perlawatan.confirm_pastor == 1 ? 'text-green-800 border border-green-300 bg-green-50' : (perlawatan.cancel_perlawatan == 1 ? 'text-red-800 border border-red-300 bg-red-50' : 'text-blue-800 border border-blue-300 bg-blue-50') "  class="p-4 mb-4 rounded-lg  mr-5" role="alert">
        <div class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <h3 class="text-lg font-medium">Jadwal Perlawatan </h3>
        </div>
        <div class="mt-2 mb-4 text-sm flex gap-2">
            <div class="">
                <p>Nama pastor</p>
                <p>Nama user</p>
                <p>Jadwal</p>
                <p v-if="perlawatan.cancel_perlawatan">Alasan</p>
            </div>
            <div class="">
                <p>: {{ perlawatan.pastor?.name }}</p>
                <p>: {{ perlawatan.user?.name }}</p>
                <p>: {{ perlawatan.tanggal_perlawatan }}</p>
                <p v-if="perlawatan.cancel_perlawatan">: {{ perlawatan.reason_cancel }}</p>
            </div>
        </div>
        <div class="flex">
            <button v-if="!perlawatan.cancel_perlawatan && !perlawatan.confirm_pastor" @click="btnApprove(perlawatan.id)" type="button" :class=" perlawatan.confirm_pastor == 1 ? 'bg-green-800 hover:bg-green-900 focus:ring-green-200' : (perlawatan.cancel_perlawatan == 1 ? 'bg-red-800 hover:bg-red-900 focus:ring-red-200' : 'bg-blue-800 hover:bg-blue-900 focus:ring-blue-200')" class="text-white focus:outline-none focus:ring-4 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center">
                Approve perlawatan
            </button>
            <button v-if="!perlawatan.cancel_perlawatan" @click="btnReject(perlawatan.id)" type="button" class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-400 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                reject
            </button>
        </div>
    </div>

        <!-- confirm reject -->
        <div v-if="confirmReject" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div tabindex="-1" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-md w-10/12">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason for reject</label>
                            <textarea v-model="alasan" id="message" rows="4" class=" mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                            <button @click="rejectPerlawatan" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button @click="btnCloseReject" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirm reject -->

        <!-- confirm approve -->
        <div v-if="confirmApprove" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div tabindex="-1" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-md w-10/12">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            <box-icon type='solid' name='check-square' size="md"></box-icon>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to approve this perlawatan?</h3>

                            <button @click="approvePerlawatan" data-modal-hide="popup-modal" type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button @click="btnCloseApprove" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirm approve -->

</template>