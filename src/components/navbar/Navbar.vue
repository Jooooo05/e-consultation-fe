<script>
    export default {
        data(){
            return {
                isLoggedin: false, //Default value
                isPerlawatanOrKonsultasi: null,
            }
        },
        created() {
            this.isLoggedin = !!localStorage.getItem('token');
        },
        methods: {
            btnPerlawatan : function () {
                this.isPerlawatanOrKonsultasi = 'perlawatan';
            },
            btnKonsultasi : function () {
                this.isPerlawatanOrKonsultasi = 'konsultasi';
            },
            btnClear : function () {
                this.isPerlawatanOrKonsultasi = null;
            }
        }
    }
</script>

<template>
    

    <nav class="bg-white fixed top-0 left-0 right-0 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <RouterLink to="/dashboard" class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-consultation</span>
            </RouterLink>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <RouterLink to="/dashboard" :class="$route.name == 'dashboard' ? 'text-blue-600' : 'text-gray-900'" class="block py-2 px-3 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"><span @click="btnClear">Home</span></RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ path: '/pastor', query: { isConsultation: true } }" :class=" isPerlawatanOrKonsultasi === 'konsultasi' ? 'text-blue-600' : 'text-gray-900'" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><span @click="btnKonsultasi">Konsultasi</span></RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ path: '/pastor', query: { isConsultation: false } }" :class=" isPerlawatanOrKonsultasi === 'perlawatan' ? 'text-blue-600' : 'text-gray-900'" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><span @click="btnPerlawatan">Perlawatan</span></RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/blog" :class="$route.name == 'blog' ? 'text-blue-600' : 'text-gray-900'" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><span @click="btnClear">Blog</span></RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact" :class="$route.name == 'contact' ? 'text-blue-600' : 'text-gray-900'" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><span @click="btnClear">Contact</span></RouterLink>
                    </li>
                    <li v-if="isLoggedin">
                        <RouterLink to="/profile" :class="$route.name == 'profile' ? 'text-blue-600' : 'text-gray-900'" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><span @click="btnClear">Profile</span></RouterLink>
                    </li>
                    <li v-else>
                        <RouterLink to="/login" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ path: '/profile', query: { showNotification: true } }" :key="$route.fullPath" ><box-icon type='solid' name='bell-ring' color="yellow"></box-icon></RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>