<template>
  
        <div class="home">
            <!-- 大容器 -->
            <el-container>
                <!-- 左边栏 -->
                <el-aside width="200px">
                    <!-- 左边栏小组件 -->
                    <LeftNav></LeftNav>
                </el-aside>
                <!-- 右边栏 -->
                <el-container>
                    <!-- 上 -->
                    <el-header>
                        <!-- 自定义头部组件 -->
                        <Top ref="top"></Top>
                    </el-header>

                    <!-- 中 -->
                    <el-main>
                        <!-- 页面组件出口 -->
                        <router-view @ChildToFather="fn"></router-view>

                    </el-main>

                    <!-- 下 -->
                    <el-footer>
                        <!-- 自定义头部组件 -->
                        <Bottom></Bottom>
                    </el-footer>

                </el-container>
            </el-container>

           
        </div>
  
</template>

<script>
    // 1.引入LeftNav组件
    import LeftNav from '@/components/LeftNav/LeftNav.vue';
    import Top from '@/components/Top/Top.vue';
    import Bottom from '@/components/Bottom/Bottom.vue';
    

    export default {
        // 2. 注册LeftNav组件
        components: {
            LeftNav,
            Top,
            Bottom
        },
        methods: {
            fn() {
                this.$refs.top.getUserInfo();
            }
        }
    }
</script>

<style lang="less">
    @import './home.less';
</style>