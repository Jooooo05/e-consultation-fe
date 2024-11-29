<template>
    
    <div class="w-full h-screen flex">
        <!-- banner left -->
        <div class="w-1/2 h-screen flex justify-center items-center bg-blue-900">
            <h1 class="text-center mb-10 text-3xl font-bold text-white">Sign In</h1>
        </div>
        <!-- banner left -->

        <!-- section right -->
         <div class="w-1/2 h-screen ">
            
            <div class="h-screen flex justify-center items-center">
                <div class="w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2">
                    <h1 class="text-center mb-10 text-3xl font-bold text-blue-900">E-Consultation</h1>
                    <form @submit.prevent>
                        <div class="relative mb-6">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                </svg>
                            </div>
                            <input v-model="email" for="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email">
                        </div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <box-icon color="grey" type='solid' name='lock-alt'></box-icon>
                            </span>
                            <input v-model="password" for="password" type="password" id="password" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-900 focus:border-blue-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password">
                        </div>
                        <button @click="login" type="submit"class="text-center bg-blue-900 text-white mt-10 w-full py-2 rounded-full text-md font-semibold transition-all mx-auto hover:bg-blue-800">Login</button>
                    </form>
                    <p class="mt-5 px-2 text-center">Don`t have an account "<router-link to="/register" class="text-blue-900 font-semibold">Register</router-link>" here</p>
                </div>
            </div>

         </div>
        <!-- section right -->

        <!-- toast -->
        <div :class="showToast ? 'right-3' : '-right-80'" class="transition-all duration-300 fixed top-4 flex items-center w-full max-w-[260px] px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div :class="isIconToast ? 'text-green-500 bg-green-100' : 'text-orange-500 bg-orange-100'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                <svg v-if="isIconToast" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <svg v-else class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
            </div>
            <div class="ms-3 text-sm font-normal">{{ messageToast }}</div>
        </div>
        <!-- toast -->
    </div>

</template>

<script>

import axios from 'axios';
import router from '@/router';

    export default {
        data() {
            return{
                email: "",
                password: "",
                messageToast: "",
                showToast: false,
                isIconToast: false,
            }
        },

        methods: {

            login() {
                
                if(this.email && this.password){
                    const credentials = {
                        email: this.email,
                        password: this.password
                    };

                    axios.post('http://e-consultationbe.test/api/login', credentials)
                    .then(response => {
                        const token = response.data.token;
                        const user = response.data.user;
                        this.isIconToast = true;
                        this.messageToast = response.data.message;

                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('role', JSON.stringify({
                            isAdmin: user.is_admin,
                            isUser: user.is_user,
                            isPastor: user.is_pastor
                        }));


                        this.showToast = true;

                        setTimeout(() => {
                            this.showToast = false
                        },1000)

                        setTimeout(() => {
                            if(user.is_admin){
                                router.push({ name: 'admin'})
                            } else{
                                router.push({ name: 'dashboard'})
                            }
                        }, 2000)


                    }).catch(error => {
                        console.log('Error', error);
                        this.messageToast = error.response.data.error;
                        this.showToast = true;
                        setTimeout(() =>{
                            this.showToast = false;
                        }, 2000)
                    });
                }else{

                }



            },

        },

        mounted() {
            const token = localStorage.getItem('token')
            if(token){
                router.push({ name: 'dashboard' })
            }
        }
    }
</script>

