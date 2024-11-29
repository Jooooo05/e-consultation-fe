<template>
    <div class="">
        <div class="pl-20 pb-2 border-b-2 border-gray-200">
            <h1 class="font-semibold text-3xl text-slate-700">Perlawatan</h1>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { query } from 'firebase/firestore';

    export default {
        data(){
            return {
                token: '',
                allPerlawatan: [],


            }
        },
        created(){
            this.token = localStorage.getItem('token');
        },
        mounted() {
            this.getAllPerlawatan();
        },

        methods: {
            getAllPerlawatan: async function()
            {
                try {

                    const header = {
                        'Authorization': `Bearer ${this.token}`,
                    }

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/perlawatan',
                        headers: header
                    });

                    console.log(response.data.data);
                    
                } catch (error) {
                    console.log('Error', error);
                    
                }
            }
        }
    }
</script>