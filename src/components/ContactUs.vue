<template>
    <div class="contact-us-container">
      <h2>联系我们</h2>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>联系信息</span>
        </div>
        <div class="contact-info">
          <p>
            <el-icon :size="24"><chat-dot-round /></el-icon>
            <span>微信: flowerfadeaway</span>
          </p>
          <p>
            <el-icon :size="24"><chat-square /></el-icon>
            <span>QQ: 554222918</span>
          </p>
          <p>
            <el-icon :size="24"><message /></el-icon>
            <span>邮箱: booksChange@163.com</span>
          </p>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { ElIcon } from 'element-plus';
  import { ChatDotRound, ChatSquare, Message } from '@element-plus/icons-vue';
  
  export default {
    name: 'ContactUs',
    components: {
      ElIcon,
      chatDotRound: ChatDotRound,
      chatSquare: ChatSquare,
      message: Message,
    },
  };
  </script>
  
  <style scoped>
  .contact-us-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: #fff;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .contact-info {
    font-size: 16px;
    line-height: 2;
  }
  
  .contact-info p {
    display: flex;
    align-items: center;
  }
  
  .contact-info p el-icon {
    margin-right: 10px;
  }
  </style>
  