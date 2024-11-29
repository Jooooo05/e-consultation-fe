<script>
import axios from 'axios';

    export default {
        data() {
            return {
                token: '',
                userId: null,
                user: {}, // Data user yang akan diambil dari API
            }
        },
        created() {
            this.token = localStorage.getItem('token');

            // Mengambil id dari params
            
            this.userId = this.$route.params.id;


            // Fetch data dari API menggunakan id
            this.fetchUserData();
        },
        methods: {
            async fetchUserData() {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: `http://e-consultationbe.test/api/profile_user/${this.userId}`,
                        headers: headers
                    });

                    console.log(response.data.data);
                    this.user = response.data.data;
                } catch (error) {
                    console.log('error', error);
                    
                }
            }
        }
    }
</script>

<template>
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
    <!-- Profile Header -->
    <div class="bg-blue-600 h-32"></div>
    <div class="relative -mt-16 w-32 h-32 mx-auto bg-white rounded-full border-4 border-white overflow-hidden">
      <img 
        v-if="user.photo_user" 
        :src="`http://e-consultationbe.test/storage/photos/${user.photo_user}`" 
        alt="Profile Picture" 
        class="object-cover w-full h-full"
      />
    </div>

    <!-- Profile Information -->
    <div class="text-center mt-4">
      <h2 class="text-2xl font-semibold text-gray-800">{{ user.name }}</h2>
      <p class="text-gray-500">{{ user.email }}</p>
    </div>

    <div class="p-6">
      <h3 class="text-lg font-medium text-gray-800">Detail Information</h3>
      <div class="mt-4 space-y-2">
        <!-- Active Status -->
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-600">Status:</span>
          <span 
            :class="user.active.active === 'Active' ? 'text-green-600' : 'text-red-600'"
            class="font-medium"
          >
            {{ user.active.active }}
          </span>
        </div>

        <!-- Phone Number -->
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-600">Phone:</span>
          <span class="text-gray-800">{{ user.no_hp }}</span>
        </div>

        <!-- Address -->
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-600">Address:</span>
          <span class="text-gray-800">{{ user.alamat }}</span>
        </div>

        <!-- Church Information -->
        <div class="flex items-start space-x-2">
          <span class="font-semibold text-gray-600">Church:</span>
          <div>
            <p class="text-gray-800 font-medium">{{ user.chruch.nama_gereja }}</p>
            <p class="text-gray-500">{{ user.chruch.alamat_gereja }}</p>
          </div>
        </div>

        <!-- Role Information -->
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-600">Role:</span>
          <span class="text-gray-800">
            {{ user.is_admin ? 'Admin' : user.is_pastor ? 'Pastor' : 'User' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>