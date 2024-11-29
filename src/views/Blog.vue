<script>
import axios from 'axios';

    export default {
        data(){
            return {
                allBlog: [],

                search: "",
                // pagination
                currentPage: 1,
                lastPage: 0,
            }
        },

        mounted() {
            this.getAllBlog();
        },
        watch: {
            search(newValue){
                // console.log(newValue);
                this.getAllBlog(newValue);
            }
        },
        methods: {
            getAllBlog: async function(query = '') {
                try {
                    const all_blog = await axios.get('http://e-consultationbe.test/api/blog', {
                        params: {
                            query: query,
                            page: this.currentPage,
                        },
                    })

                    console.log(all_blog.data.data.data);
                    this.allBlog = all_blog.data.data.data
                    this.currentPage = all_blog.data.data.current_page; // Menyimpan first page data pagination
                    this.lastPage = all_blog.data.data.last_page; // Menyimpan data last page pagination
                }catch (error) {
                    console.log('error : ' + error )
                }
            },
        }
    }

</script>

<template>

    <div class="mt-24 mx-32">
        <h1 class="text-5xl font-bold text-slate-800">Blogs </h1>

        <div class="my-8">

            <div v-for="blog in allBlog" :key="blog.id" class="max-w-6xl border-b my-5">
                <h3>{{ blog.judul_blog }}</h3>
                <p class="my-2">{{ blog.isi_blog }}</p>
                <span>{{ blog.penulis }}</span>
            </div>

        </div>
    </div>

</template>