<template>
    <div style="padding: 20px;">
        <el-card v-if="bookDetail" class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ bookDetail.title }}</span>
                <el-button type="primary" icon="el-icon-download" style="float: right;" @click="downloadBook"
                    :loading="downloading">
                    下载
                </el-button>
            </div>
            <div>
                <p><strong>ISBN:</strong> {{ bookDetail.isbn }}</p>
                <p><strong>作者:</strong> {{ bookDetail.author }}</p>
                <p><strong>出版社:</strong> {{ bookDetail.publisher }}</p>
                <p><strong>格式:</strong> {{ bookDetail.format }}</p>
                <p><strong>大小:</strong> {{ bookDetail.size }}</p>
                <p><strong>下载:</strong> {{ bookDetail.url }}</p>
            </div>
        </el-card>
        <p v-else-if="loading">加载中...</p>
        <p v-else-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
        <p v-else>没有找到相关书籍信息</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { bookChangeCuckoo } from '@/axios';

export default {
    name: 'BookDetail',
    setup() {
        const route = useRoute();
        const bookDetail = ref(null);
        const loading = ref(false);
        const downloading = ref(false);
        const errorMessage = ref('');

        const fetchBookDetail = async (bookUrl) => {
            loading.value = true;
            try {
                const response = await bookChangeCuckoo.get(`/detail`, {
                    params: {
                        bookUrl: bookUrl,
                    },
                });
                bookDetail.value = response.data;
            } catch (error) {
                errorMessage.value = '加载书籍详情时发生错误，请稍后再试。';
                console.error('Error fetching book detail:', error);
            } finally {
                loading.value = false;
            }
        };

        const downloadBook = async () => {
            if (!bookDetail.value || !bookDetail.value.url) {
                return;
            }
            downloading.value = true;
            try {
                const response = await bookChangeCuckoo.post(
                    '/downloadBook',
                    { url: bookDetail.value.url },
                    {
                        responseType: 'blob',
                        timeout: 600000, // 10分钟
                    }
                );

                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // 从 Content-Disposition 头中获取文件名
                const contentDisposition = response.headers['content-disposition'];
                let fileName = bookDetail.value.title;

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=(['"]?)([^;\n]*)\1/);
                    if (fileNameMatch.length > 2) {
                        fileName = fileNameMatch[2];
                    }
                } else {
                    // 如果 Content-Disposition 头不存在，则使用默认扩展名
                    const fileExtension = response.headers['content-type'].split('/').pop();
                    fileName = `${fileName}.${fileExtension}`;
                }

                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);
            } catch (error) {
                errorMessage.value = '下载书籍时发生错误，请稍后再试。';
                console.error('Error downloading book:', error);
            } finally {
                downloading.value = false;
            }
        };


        onMounted(() => {
            const bookUrl = `/book${route.fullPath.replace('/book', '')}.html`;
            fetchBookDetail(bookUrl);
        });

        return {
            bookDetail,
            loading,
            downloading,
            errorMessage,
            downloadBook,
        };
    },
};
</script>

<style scoped>
.box-card {
    margin: 20px 0;
}
</style>