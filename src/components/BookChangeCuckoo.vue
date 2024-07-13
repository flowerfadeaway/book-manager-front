<template>
  <div class="scraper-results">
    <el-form :inline="true" label-width="100px" class="search-form">
      <el-form-item label="查询内容">
        <el-input v-model="query" placeholder="输入查询内容"></el-input>
      </el-form-item>
      <el-form-item label="查询类型">
        <el-radio-group v-model="searchType">
          <el-radio :label="'none'">混合查询</el-radio>
          <el-radio :label="'publisher'">按出版社查询</el-radio>
          <el-radio :label="'author'">按作者查询</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="语言">
        <el-switch v-model="isChinese" active-text="中文" inactive-text="默认"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 显示查询结果 -->
    <div v-if="scrapeResult.results.length > 0">
      <el-table :data="scrapeResult.results" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="isbn" label="ISBN" width="180"></el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
        <el-table-column label="书名" width="180">
          <template #default="{ row }">
            <a :href="generateHref(row.href)" target="_blank">{{ row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="publisherText" label="出版社" width="180"></el-table-column>
        <el-table-column prop="suffix" label="格式" width="100"></el-table-column>
        <el-table-column prop="size" label="大小" width="100"></el-table-column>
      </el-table>
      <el-pagination
        v-if="scrapeResult.totalPages > 1"
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="50"
        :total="scrapeResult.totalPages"
        style="margin-top: 20px;"
      ></el-pagination>
    </div>

    <!-- 显示加载中、错误信息或无数据信息 -->
    <div v-else>
      <p v-if="loading" style="margin-top: 20px;">查询中，请等待...</p>
      <p v-else-if="errorMessage" style="color: red; margin-top: 20px;">{{ errorMessage }}</p>
      <p v-else style="margin-top: 20px;">{{ noDataMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { bookChangeCuckoo } from '@/axios'; // 假设 bookChangeCuckoo 是你定义的 Axios 实例

const query = ref('');
const searchType = ref('none');
const isChinese = ref(false); // 默认语言为关闭状态，即不传language参数
const scrapeResult = ref({ results: [], totalPages: 0 }); // 初始化为一个包含结果和总页数的对象
const loading = ref(false);
const errorMessage = ref('');
const noDataMessage = ref('没有查到相应数据');
const currentPage = ref(1); // 当前页数

const fetchScrapedData = async (page: number) => {
  loading.value = true; // 设置加载状态为 true
  errorMessage.value = ''; // 重置错误信息
  try {
    let url = `/scrape`;
    const params = { query: encodeURIComponent(query.value), page };
    
    if (searchType.value === 'publisher') {
      url += `/publisher`;
    } else if (searchType.value === 'author') {
      url += `/author`;
    }

    // 如果开关打开，则在URL中添加language参数
    if (isChinese.value) {
      params.language = 'chinese';
    }

    const response = await bookChangeCuckoo.get(url, { params });
    // 更新为新的 ScrapeResult 结构
    scrapeResult.value = response.data;
  } catch (error) {
    errorMessage.value = '查询数据时发生错误，请稍后再试。';
    console.error('Error fetching scraped data:', error);
  } finally {
    loading.value = false; // 无论请求成功或失败，都将加载状态重置为 false
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchScrapedData(page);
};

const handleSearch = () => {
  currentPage.value = 1; // 重置当前页数为 1
  fetchScrapedData(1);
};

const generateHref = (href: string) => {
  return `${href.replace('.html', '')}`;
};

</script>

<style scoped>
.scraper-results {
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
}
</style>

