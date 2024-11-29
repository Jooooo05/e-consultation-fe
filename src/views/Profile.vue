<template>
    <div class="mb-2 mt-24 box-border">

        <div class="flex mt-10">


            <!-- side bar -->
            <aside class="w-80 shadow-md rounded-2xl overflow-hidden py-6 px-3 fixed top-20 left-4 bottom-0">

                <main>

                    <div class="mb-6 xl:flex gap-8 box-border border-b pb-5">
                        <div class=" w-[30%] h-[30] lg:w-[20%] lg:h-[20%] mx-auto md:mx-0">
                            <img class=" rounded-full" :src="photo_user" alt="Rounded avatar">
                        </div>
                        <div class="mx-3 xl:flex flex-col justify-center text-center md:mx-0 md:text-start">
                            <h5 class="font-semibold text-base">{{ user.name ? `Hi! ${user.name} 👋` : '( isi data diri )' }} </h5>
                            <p class="text-xs">{{ user.email ? user.email : '(isi data diri)' }}</p>
                            <!-- <p>{{ user.photo_user }} haalo</p> -->
                        </div>
                    </div>

                    <div @click="showProfile" class="cursor-pointer flex justify-between px-1 py-2 hover:bg-gray-200 rounded-md">
                        <div class="flex justify-center items-center gap-5">
                            <box-icon name='user'></box-icon>
                            <span>My profile</span>
                        </div>
                        <box-icon name='chevron-right'></box-icon>
                    </div>
                    <div v-if="role.isPastor" @click="showPerlawatan" class="cursor-pointer flex justify-between px-1 py-2 hover:bg-gray-200 rounded-md relative">

                        <span :class="countPerlawatan == 0 ? 'hidden' : ''" class="w-[20px] text-[12px] text-red-600 rounded-full bg-red-300 text-center absolute top-[1px] -left-[6px]">{{ countPerlawatan }}</span>

                        <div class="flex justify-center items-center gap-5">
                            <box-icon name='calendar'></box-icon>
                            <span>Perlawatan</span>
                        </div>
                        <box-icon name='chevron-right'></box-icon>

                    </div>
                    <div @click="showKonsultasi" class="cursor-pointer flex justify-between px-1 py-2 hover:bg-gray-200 rounded-md relative">

                        <span :class="userConsultationCount == 0 ? 'hidden' : ''" class="w-[20px] text-[12px] text-red-600 rounded-full bg-red-300 text-center absolute top-[1px] -left-[6px]">{{ userConsultationCount }}</span>

                        <div class="flex justify-center items-center gap-5">
                            <box-icon name='conversation'></box-icon>
                            <span>Consultation</span>
                        </div>
                        <box-icon name='chevron-right'></box-icon>

                    </div>
                    <div @click="showNotification" class="cursor-pointer flex justify-between px-1 py-2 hover:bg-gray-200 rounded-md">
                        <div class="flex justify-center items-center gap-5">
                            <box-icon name='bell'></box-icon>
                            <span>Notification</span>
                        </div>
                        <box-icon name='chevron-right'></box-icon>
                    </div>
                    <div @click="logout()" class="cursor-pointer flex justify-between px-1 py-2 hover:bg-red-200 rounded-md">
                        <div class="flex justify-center items-center gap-5">
                            <box-icon name='log-out-circle' ></box-icon>
                            <span>Log Out</span>
                        </div>
                        <box-icon name='chevron-right'></box-icon>
                    </div>

                </main>

            </aside>
            <!-- side bar -->

            
            <!-- profile -->
            <main class="w-full ml-[360px]">
                
                <!-- compenet -->
                <component :is="currentComponent" :id="userId"></component>
                <!-- compenet -->

            </main>
            <!-- profile -->


        </div>




    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import User from '@/components/profile/user.vue';
import Notification from '@/components/profile/notification.vue';
import Perlawatan from '@/components/profile/perlawatan.vue';
import Konsultasi from '@/components/profile/konsultasi.vue';

    export default {
        components: {
            User,
            Notification,
            Perlawatan,
            Konsultasi,
        },
        data() {
            return {
                currentComponent: 'User',
                isNotificationVisible: false,
                photo_user: '',
                isProfileVisible: true,
                isPerlawatan: false,
                isKonsultasi: false,
                token: '',
                role: {},
                user: {},
                userId: 0,
                countPerlawatan: 0,

                userConsultationCount: 0,
            }
        },
        created(){
            let roleData = localStorage.getItem('role');
            if(roleData){
                this.role = JSON.parse(roleData);
            }
            this.token = localStorage.getItem('token');
        },
        mounted() {
            if (this.$route.query.showNotification) {
                this.showNotification();
            }
            this.profileUser();
            this.consultationCount();
        },
        provide() {
            return {
                parentProfileUser: this.profileUser,
            }
        },
        methods: {
            profileUser: async function () {
                try {

                const user = await axios.get('http://e-consultationbe.test/api/me', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                this.user = user.data.data;
                this.photo_user = user.data.user_photo
                console.log(user.data);
                this.userId = user.data.data.id;

                if(user.data.data.is_user == true){
                    this.perlawatanUser();
                }else if(user.data.data.is_pastor == true){
                    this.perlawatanPastor();
                }

                }catch (error) {
                console.error('error : ', error)
                }
            },

            perlawatanPastor: async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'aplication/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: `http://e-consultationbe.test/api/total_perlawatan_pastor/${this.userId}`,
                        headers: headers
                    });

                    // console.log(response);
                    this.countPerlawatan = response.data.data;
                } catch (error) {
                    console.log('Error', error);
                }
            },

            perlawatanUser: async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'aplication/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: `http://e-consultationbe.test/api/total_perlawatan_user/${this.userId}`,
                        headers: headers
                    });

                    // console.log(response);
                    this.countPerlawatan = response.data.data;
                } catch (error) {
                    console.log('Error', error);
                }
            },

            consultationCount: async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'aplication/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/user/count',
                        headers: headers
                    });

                    this.userConsultationCount = response.data.data;
                } catch (error) {
                    console.log('Error', error);
                }
            },


            showProfile: function () {
                this.isProfileVisible = true;
                this.isNotificationVisible = false;
                this.isKonsultasi = false;
                this.isPerlawatan= false;
                this.currentComponent = 'User';
            },
            showPerlawatan: function (id) {
                this.isPerlawatan= true;
                this.isProfileVisible = false;
                this.isKonsultasi = false;
                this.isNotificationVisible = false;
                this.currentComponent = 'Perlawatan';
            },
            showNotification: function () {
                this.isPerlawatan= false;
                this.isProfileVisible = false;
                this.isNotificationVisible = true;
                this.isKonsultasi = false;
                this.currentComponent = 'Notification';
            },
            showKonsultasi: function () {
                this.isKonsultasi = true;
                this.isPerlawatan = false;
                this.isProfileVisible = false;
                this.isNotificationVisible = false;
                this.currentComponent = 'Konsultasi';
            },

            logout: function() {
                const token_id = localStorage.getItem('token')

                axios.get("http://e-consultationbe.test/api/logout", {
                    headers: {
                        Authorization: `Bearer ${token_id}`
                        },
                    }
                )
                .then((response) => {
                    alert(response.data.message)
                    localStorage.clear();
                    router.push({ name: 'login'})
                })
                .catch((error) => console.log(error));
            }
        }
    }


    
</script>