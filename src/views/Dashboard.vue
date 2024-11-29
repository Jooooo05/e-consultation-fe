<template>
    <div class="my-24">
        <!-- {{ localStorage.getItem('name') }} -->
        <!-- header start -->
            <div class="mx-5 md:w-5/6 md:mx-auto md:flex justify-end">

                <!-- Text Dashboard -->
                    <main class="w-full  md:w-2/5">

                        <div class="flex justify-center items-center h-full">
                            <div class="">
                                <Textconsultation class="mb-5" />
            
                                <div class="box-border">
                                    <h1 class="mb-3 text-4xl font-bold text-slate-600">Keep Your Faith Burning</h1>            
                                    <p class="text-slate-600 mb-6" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, recusandae enim quia aliquid eum unde similique fugit! Repellat et soluta facere quis saepe nostrum aliquam amet placeat voluptates dolorem! Vitae?</p>
            
                                    <RouterLink :to="{ path: '/pastor', query: { isConsultation: true } }" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Konsultasi</RouterLink>
                                    
                                </div>
                            </div>
                        </div>

                    </main>
                <!-- Text Dashboard -->

                <!-- image consultation -->
                    <main class="w-full mt-20 md:mt-0 md:w-1/2  flex justify-center items-center">
                        <div class="">
                            <img class="mx-auto" width="80%" height="80%" src="@/assets/img/1.png" alt="Faith-daashboard">
                        </div>
                    </main>
                <!-- image consultation -->

            </div>
        <!-- header end -->

        <!-- Information start -->
            <div class="mx-5 md:w-5/6 md:mx-auto my-32">
                
                <h1 class="text-center text-4xl font-bold mb-8 text-slate-600">Information</h1>
                
                <div class="box-border px-5 lg:px-0 w-full bg-gray-100 rounded-2xl md:rounded-[60px] lg:rounded-[100px] pt-5 pb-10">

                    <div class="flex flex-col gap-10 md:flex-row justify-around">

                        <div class="flex justify-center">
                            <div class="">
                            </div>
                            <div class="text-slate-600">
                                <h4 class="text-base md:text-lg font-bold  " >Contact Us</h4>
                                <span>(404) - 805 7080</span>
                                <p>info@consultation.com</p>
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <div class="">
                            </div>
                            <div class="text-slate-600">
                                <h4 class="text-base md:text-lg font-bold  " >Open Hours</h4>
                                <span>(404) - 805 7080</span>
                                <p>info@consultation.com</p>
                            </div>
                        </div>

                        <div class="flex justify-center">
                            <div class="">
                            </div>
                            <div class="text-slate-600">
                                <h4 class="text-base md:text-lg font-bold  " >Our Services</h4>
                                <span>(404) - 805 7080</span>
                                <p>info@consultation.com</p>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </div>
        <!-- Information end -->


        <!-- Service start -->
            <div class="mx-5 md:w-5/6 md:mx-auto my-32">
                <div class="">
                    <div class="py-10 text-slate-600">

                        <h1 class="text-center text-4xl font-bold mb-8" >Service</h1>

                        <div class="w-full md:w-3/5 justify-around mx-auto mt-20 py-10 md:flex">

                            <div class="lg:w-2/5 border-2 box-border p-10 rounded-lg hover:shadow-md hover:rotate-1 transition-all duration-700">
                                <RouterLink :to="{ path: '/pastor', query: { isConsultation: true } }">
                                    <div class="">
                                        <img src="@/assets/img/3.png" alt="Konsultasi">
                                    </div>
                                    <h3 class="text-center text-xl font-semibold">Konsultasi</h3>
                                </RouterLink>
                            </div>
                        
                            <div class="mt-10 md:mt-0 lg:w-2/5 border-2 box-border p-10 rounded-lg hover:shadow-md hover:rotate-1 transition-all duration-700">
                                <RouterLink :to="{ path: '/pastor', query: { isConsultation: false } }">
                                    <img src="@/assets/img/4.png" alt="Perlawatan">
                                    <h3 class="text-center text-xl font-semibold">Perlawatan</h3>
                                </RouterLink>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        <!-- Service start -->

        

    </div>
</template>

<script>
import router from '@/router';

    export default {
        data() {
            return {

            }
        },
        
        mounted() {
            localStorage.getItem
        }
    }
</script>

<style scoped>

</style>