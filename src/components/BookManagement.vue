<template>
  <div class="container">
    <div v-show="counter.role === 'ROLE_ADMIN'">
      <h2>用于添加书籍元信息</h2>
      <el-form :model="form" label-width="80px">
        <el-form-item label="书名" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="form.isbn"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="form.publisher"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">上传</el-button>
        </el-form-item>
      </el-form>
    </div>


    <h2>用于查询书籍</h2>
    <el-table :data="books" border style="margin-top: 20px;">
      <el-table-column prop="title" label="书名"></el-table-column>
      <el-table-column prop="isbn" label="ISBN"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="publisher" label="出版社"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button v-show="counter.role === 'ROLE_ADMIN'" type="primary" @click="editBook(scope.row)">Edit</el-button>
          <el-button v-show="counter.role === 'ROLE_ADMIN'" type="primary" @click="deleteBook(scope.row.id)">Delete</el-button>
          <el-button type="primary" @click="downloadBook(scope.row.title)">Download</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-input v-model="searchQuery" placeholder="输入书名，ISBN，作者，出版社搜索" style="margin-top: 20px;"></el-input>
    <el-button type="primary" @click="searchBooks">搜索</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { booksManagerEs, booksManager } from '@/axios';
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();

const form = ref({
  title: '',
  isbn: '',
  author: '',
  publisher: ''
});

const books = ref([]);
const searchQuery = ref('');

const submitForm = async () => {
  try {
    await booksManagerEs.post('/books', form.value);
    await booksManager.post('/books', form.value);
    ElMessage.success('Book added successfully');
    resetForm();
    //   fetchBooks();
  } catch (error) {
    ElMessage.error('Failed to add book');
  }
};

const resetForm = () => {
  form.value = {
    title: '',
    isbn: '',
    author: '',
    publisher: ''
  };
};


const editBook = (book) => {
  form.value = { ...book };
};

const deleteBook = async (id) => {
  try {
    await booksManagerEs.delete(`/books/${id}`);
    ElMessage.success('Book deleted successfully');
    //   fetchBooks();
  } catch (error) {
    ElMessage.error('Failed to delete book');
  }
};

const searchBooks = async () => {
  try {
    const response = await booksManagerEs.get('/books/search', {
      params: {
        query: searchQuery.value
      }
    });
    books.value = response.data.data;
  } catch (error) {
    ElMessage.error('Failed to search books');
  }
};

const downloadBook = async (title) => {
  try {
    const response = await booksManager.get(`/download?fileName=${encodeURIComponent(title)}`, {
      responseType: 'blob', // 设置响应类型为 blob，以便处理文件
    });
    console.log(response);
    const blob = new Blob([response.data]); // 创建一个 Blob 对象
    const url = window.URL.createObjectURL(blob); // 创建 URL 对象
    const link = document.createElement('a'); // 创建一个 <a> 元素
    link.href = url; // 设置链接地址
    link.setAttribute('download', `${title}.pdf`); // 设置下载文件的文件名
    document.body.appendChild(link); // 将 <a> 元素添加到页面中
    link.click(); // 模拟点击链接
    document.body.removeChild(link); // 点击后移除 <a> 元素
    window.URL.revokeObjectURL(url); // 释放 URL 对象
  } catch (error) {
    ElMessage.error('没有该书或者请求处理报错，请检查');
  }
};


</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>