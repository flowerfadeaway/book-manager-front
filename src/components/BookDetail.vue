<template>
  <div class="book-detail-container">
    <el-card v-if="bookDetail" class="book-card">
      <div slot="header" class="clearfix">
        <span>{{ bookDetail.title }}</span>
        <a @href="downloadUrl" @click="downloadBook" :loading="downloading" download="fileName.pdf">下载</a>
        <el-button type="primary" icon="el-icon-download" style="float: right;" @click="downloadBook"
          :loading="downloading">
          下载
        </el-button>
      </div>
      <div>
        <p><strong>ISBN:</strong> {{ bookDetail.isbn }}</p>
        <p><strong>作者:</strong> {{ bookDetail.author }}</p>
        <p><strong>出版社:</strong> {{ bookDetail.publisherText }}</p>
        <p><strong>格式:</strong> {{ bookDetail.suffix }}</p>
        <p><strong>大小:</strong> {{ bookDetail.size }}</p>
      </div>
    </el-card>
    <p v-else-if="loading">加载中...</p>
    <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-else>没有找到相关书籍信息</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { bookChangeCuckoo } from '@/axios';
import { ElMessage } from 'element-plus';
import ObsClient from 'esdk-obs-browserjs';



export default {
  name: 'BookDetail',
  setup() {
    const route = useRoute();
    const bookDetail = ref(null);
    const loading = ref(false);
    const downloading = ref(false);
    const downloadUrl = ref('');
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
    const downloadPdf = async (fileName) => {
      // 创建 ObsClient 实例
      const obsClient = new ObsClient({
        access_key_id: 'SLN6GC63U3B745KJTZH8',
        secret_access_key: 'GeeMHD5QXrVUFvQCGZWcumA8C4gLmJRmxm8dr7cI',
        server: 'https://obs.cn-north-4.myhuaweicloud.com'
      });

      // 使用 obsClient.getObject 方法获取文件的下载地址
      obsClient.getObject({
        Bucket: 'books-change',
        Key: 'book/' + fileName,
        SaveByType: 'file'
      }, function (err, result) {
        if (err) {
          console.error('Error: ' + err);
        } else {
          console.log('Status: ' + result.CommonMsg.Status);
          if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
            // 获取下载对象的路径
            const downloadUrl = result.InterfaceResult.Content.SignedUrl;
            // console.log('Download Path:', downloadUrl);

            // 创建一个临时的 <a> 元素用于触发下载
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName + '_from_obs.pdf'; // 指定下载文件名
            document.body.appendChild(a);
            a.click();

            // 下载完成后移除 <a> 元素
            document.body.removeChild(a);
            // console.log('File downloaded successfully using SignedUrl');
          }
        }
      });
    }

    const downloadBook = async () => {
      downloading.value = true;
      try {
        const response = await bookChangeCuckoo.post(
          '/downloadBook',
          { 
            url: bookDetail.value.url,
            bookName: bookDetail.value.title + '.' + bookDetail.value.suffix.toLowerCase(),
            author: bookDetail.value.author,
            publisher: bookDetail.value.publisherText
          },
          {
            // responseType: 'blob',
            timeout: 7200000, // 2h
          }
        );

        console.log(response.data);
        
        downloadPdf(response.data);

        // const blob = new Blob([response.data], { type: response.headers['content-type'] });
        // const contentDisposition = response.headers['content-disposition'];
        // let fileName = `${bookDetail.value.title}.${bookDetail.value.suffix.toLocaleLowerCase()}`; // 默认文件名

        // if (contentDisposition) {
        //   const matches = /filename="(.+)"/.exec(contentDisposition);
        //   if (matches != null && matches[1]) {
        //     fileName = decodeURIComponent(matches[1]);
        //   }
        // }

        // const downloadUrl = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.style.display = 'none'
        // a.href = downloadUrl;
        // a.download = fileName;
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
        // window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        errorMessage.value = '下载书籍时发生错误，请稍后再试。';
        console.error('Error downloading book:', error);
        ElMessage.error('下载书籍时发生错误，请稍后再试。');
      } finally {
        downloading.value = false;
      }
    };

    // const downloadBook = async () => {
    //   downloading.value = true;
    //   try {
    //     const response = await bookChangeCuckoo.post(
    //       '/downloadBook',
    //       { url: bookDetail.value.url },
    //       {
    //         timeout: 600000, // 10分钟
    //       }
    //     );


    //     const downloadUrl = response.data; // 获取后端返回的下载链接
    //     window.open(`http://${window.location.hostname}:8054/book-change-cuckoo/downloadFile/${downloadUrl}`); // 打开下载链接
    //   } catch (error) {
    //     errorMessage.value = '下载书籍时发生错误，请稍后再试。';
    //     console.error('Error downloading book:', error);
    //     ElMessage.error('下载书籍时发生错误，请稍后再试。');
    //   } finally {
    //     downloading.value = false;
    //   }
    // };






    onMounted(() => {
      const bookUrl = `/book${route.fullPath.replace('/book', '')}.html`;
      fetchBookDetail(bookUrl);
      // console.log(window.location.host)
    });

    return {
      bookDetail,
      loading,
      downloading,
      downloadUrl,
      errorMessage,
      downloadBook,
    };
  },
};
</script>

<style scoped>
.book-detail-container {
  padding: 20px;
}

.book-card {
  margin-bottom: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>