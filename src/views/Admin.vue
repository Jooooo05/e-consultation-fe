    <template>
        <div class="">

            <!-- left bar -->
            <div :class="isSidebar ? 'left-0 shadow-lg' : '-left-[319px]'" class="w-80 box-border p-6 transition-all duration-200 bg-white fixed top-0 bottom-0">

                <div v-if="isSidebar" @click="showSidebar" class="absolute top-5 -right-9 flex items-center p-2 bg-white rounded-lg cursor-pointer">
                    <box-icon size="sm" name='chevrons-left'></box-icon>
                </div>
                <div v-else @click="closeSidebar" class="absolute top-5 -right-9 flex items-center p-2 bg-white rounded-lg cursor-pointer">
                    <box-icon size="sm" name='chevrons-right'></box-icon>
                </div>

                <div>
                    <div class="">
                        <h3 class="text-blue-400 font-semibold">Admin - Consultation</h3>

                        <div class="mt-10 flex">
                            <img class="w-10 h-10 rounded-full" src="@/assets/img/4.png" alt="Avatar admin">
                            <div class="ml-5">
                                <p class="font-semibold text-sm">Hi! {{ user.name }} 👋</p>
                                <p class="text-gray-400 text-xs">{{ user.email }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10">
                        <div @click="btnShowDashboard" :class="[ showDashboard ? 'bg-gray-200' : '', 'flex', 'justify-between', 'px-1', 'py-2', 'hover:bg-gray-200', 'rounded-md', 'cursor-pointer']">
                            <div class="flex justify-center items-center gap-5">
                                <box-icon type='solid' name='dashboard'></box-icon>
                                <span>Dashboard</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>
                        <div @click="btnShowUser" :class="[ showUser ? 'bg-gray-200' : '', 'flex', 'justify-between', 'px-1', 'py-2', 'hover:bg-gray-200', 'rounded-md', 'cursor-pointer']">
                            <div class="flex justify-center items-center gap-5">
                                <box-icon name='user'></box-icon>
                                <span>User</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>
                        <div @click="btnShowGereja" :class="[ showGereja ? 'bg-gray-200' : '', 'flex', 'justify-between', 'px-1', 'py-2', 'hover:bg-gray-200', 'rounded-md', 'cursor-pointer']">
                            <div class="flex justify-center items-center gap-5">
                                <box-icon name='church' ></box-icon>
                                <span>Gereja</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>
                        <div @click="btnShowPerlawatan" class="hidden justify-between px-1 py-2 hover:bg-gray-200 rounded-md cursor-pointer">
                            <div class="flex justify-center items-center gap-5">
                                <box-icon name='calendar'></box-icon>
                                <span>Perlawatan</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>
                        <div @click="btnShowBlog" :class="[ showBlog ? 'bg-gray-200' : '', 'flex', 'justify-between', 'px-1', 'py-2', 'hover:bg-gray-200', 'rounded-md', 'cursor-pointer']">
                            <div class="flex justify-center items-center gap-5">
                                <box-icon type='logo' name='blogger'></box-icon>
                                <span>Blog</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>

                        <div @click="btnShowNotif" :class="[ showNotif ? 'bg-gray-200' : '', 'flex', 'justify-between', 'px-1', 'py-2', 'hover:bg-gray-200', 'rounded-md', 'cursor-pointer']" class="relative">

                            <span :class="countAccAcount == 0 ? 'hidden' : ''" class="w-[20px] text-[12px] text-red-600 rounded-full bg-red-300 text-center absolute top-[1px] -left-[6px]">{{ countAccAcount }}</span>

                            <div class="flex justify-center items-center gap-5">
                                <box-icon name='bell-ring' type='solid' ></box-icon>
                                <span>Notifications</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>

                        <div @click="btn_logout()" class="flex justify-between px-1 py-2 hover:bg-red-200 rounded-md cursor-pointer">
                            <div class="flex justify-center items-center gap-5">
                                <box-icon name='log-out-circle' ></box-icon>
                                <span>Log Out</span>
                            </div>
                            <box-icon name='chevron-right'></box-icon>
                        </div>
                    </div>
                </div>
            </div>
            <!-- left bar -->


            <div :class="isSidebar ? 'md:ml-[320px]' : ''" class="w-full md:w-auto transition-all duration-200 bg-gray-100 pt-6">

            <!-- compenet -->
            <component :is="currentComponent"></component>
            <!-- compenet -->

            </div>

        </div>
    </template>

    <script>
        import router from '@/router';
        import axios from 'axios';
        import User from '@/components/admin/User.vue';
        import Church from '@/components/admin/Church.vue';
        import Blog from '@/components/admin/Blog.vue';
        import Dashboard from '@/components/admin/Dashboard.vue';
        import Notification from '@/components/admin/Notification.vue';
        import Perlawatan from '@/components/admin/Perlawatan.vue';

        export default {
            components: {
                User,
                Blog,
                Church,
                Dashboard,
                Notification,
                Perlawatan,
            },
            data() {
                return {
                    currentComponent: 'Dashboard',
                    token: "",
                    showDashboard: true,
                    showUser: false,
                    showPerlawatan: false,
                    showBlog: false,
                    showGereja: false,
                    showNotif: false,
                    user: {},
                    countAccAcount: 0,
                    isSidebar: true,
                }
            },

            provide() {
                return {
                    parentNotifActive: this.notifActive,
                }
            },

            async mounted() {
                this.token = localStorage.getItem('token');

                this.notifActive();
                this.userLogin();
            },
            
            methods: {

                userLogin: async function () {
                    try {

                    const admin = await axios.get('http://e-consultationbe.test/api/me', {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })

                    this.user = admin.data.data;

                    }catch (error) {
                        console.error('error : ', error)
                    }
                },

                btnShowDashboard: function () {
                    this.showDashboard = true;
                    this.showUser = false;
                    this.showBlog = false;
                    this.showNotif = false;
                    this.showGereja = false;
                    this.showPerlawatan = false;
                    this.currentComponent = 'Dashboard'
                },

                btnShowPerlawatan: function () {
                    this.showDashboard = false;
                    this.showUser = false;
                    this.showBlog = false;
                    this.showNotif = false;
                    this.showGereja = false;
                    this.showPerlawatan = true;
                    this.currentComponent = 'Perlawatan'
                },

                btnShowUser: function () {
                    this.showDashboard = false;
                    this.showUser = true;
                    this.showBlog = false;
                    this.showNotif = false;
                    this.showGereja = false;
                    this.showPerlawatan = false;
                    this.currentComponent = 'User'
                },

                btnShowGereja: function () {
                    this.showDashboard = false;
                    this.showGereja = true;
                    this.showUser = false;
                    this.showNotif = false;
                    this.showBlog = false;
                    this.currentComponent = 'Church'
                },

                btnShowBlog: function () {
                    this.showDashboard = false;
                    this.showUser = false;
                    this.showBlog = true;
                    this.showGereja = false;
                    this.showPerlawatan = false;
                    this.showNotif = false;
                    this.currentComponent = 'Blog'
                },

                btnShowNotif: function () {
                    this.showDashboard = false;
                    this.showUser = false;
                    this.showBlog = false;
                    this.showGereja = false;
                    this.showPerlawatan = false;
                    this.showNotif = true;
                    this.currentComponent = 'Notification'
                },

                notifActive: async function () {
                    try {
                        const headers = {
                            'Authorization': `Bearer ${this.token}`,
                            'Content-Type': 'aplication/json'
                        };

                        const response = await axios({
                            method: 'get',
                            url: 'http://e-consultationbe.test/api/active_notif',
                            headers: headers
                        });

                        this.countAccAcount = response.data.data;
                    } catch (error) {
                        console.log('Error', error);
                    }
                },
            
                async btn_logout() {
                    const token_id = localStorage.getItem('token')

                    await axios.get("http://e-consultationbe.test/api/logout", {
                        headers: {
                            Authorization: `Bearer ${token_id}`
                        },
                    }).then ((response) => {
                        alert(response.data.message)
                        localStorage.clear();
                        router.push({ name: 'home'})
                    }).catch((error) => console.log(error))
                },

                showSidebar: function ()
                {
                    this.isSidebar = false;
                },
                closeSidebar : function ()
                {
                    this.isSidebar = true;
                }

            },


        }








    </script>