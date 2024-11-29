<template>

    <div class="w-full h-screen flex">
        <!-- banner left -->
        <div class="w-1/2 h-screen flex justify-center items-center bg-blue-900">
            <h1 class="text-center mb-10 text-3xl font-bold text-white">Sign Up</h1>
        </div>
        <!-- banner left -->

        <!-- section right -->
         <div class="w-1/2 h-screen ">
            
            <div class="h-screen flex justify-center items-center">
                <div class="w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2">
                    <h1 class="text-center mb-10 text-3xl font-bold text-blue-900">E-Consultation</h1>
                    <form @submit.prevent>

                        <div class="relative mb-3">
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <box-icon color="grey" type='solid' name='user'></box-icon>
                                </span>
                                <input v-model="name" type="text" id="name" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username">
                            </div>
                        </div>
                        
                        <div class="relative mb-3">
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <box-icon color="grey" type='solid' name='envelope'></box-icon>
                                </span>
                                <input v-model="email" for="email" type="email" id="email" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email">
                            </div>
                        </div>


                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <box-icon color="grey" type='solid' name='lock-alt'></box-icon>
                            </span>
                            <input v-model="password" for="password" type="password" id="password" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-900 focus:border-blue-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password">
                        </div>

                        <div class="mt-3">
                            <select v-model="role_id" id="role_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled :value=0>Select a Role</option>
                                <option value="2">User</option>
                                <option value="3">Pastor</option>
                            </select>
                        </div>
                        <button @click="register" type="submit"class="text-center bg-gray-400 hover:bg-gray-500 text-white mt-6 w-full py-2 rounded-full text-md font-semibold transition-all mx-auto ">Register</button>
                    </form>
                    <p class="mt-5 px-2 text-center">Already have an account "<router-link to="/login" class="text-grey-400 font-semibold">Login</router-link>" here</p>
                </div>
            </div>

         </div>
        <!-- section right -->
    </div>

</template>

<script>
import axios from 'axios';
import router from '@/router';

    export default {
        data() {
            return {
                name: "",
                email: "",
                password: "",
                role_id: 0,

            }
        },
        methods: {
            async register() {
                try {
                    const data = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        role_id: this.role_id
                    }
                    const response = await axios.post('http://e-consultationbe.test/api/register', data);
                    alert("kamu telah berhasil login");
                    router.push({ name: 'login' });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style scoped>

</style>