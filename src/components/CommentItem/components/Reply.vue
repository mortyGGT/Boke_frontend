<template>
  <!-- 回复区 -->
  <div class="relpy-container">
    <div class="relpy">
      <ElButton type="success" @click="relpycontentShow = !relpycontentShow">回复</ElButton>
    </div>
    <div class="relpycontent" v-if="relpycontentShow">
      <div class="tw-w-full">
        <V3Emoji
          :textArea="true"
          :customSize="customSize"
          :recent="true"
          :keep="true"
          :optionsName="optionsName"
          :disableGroup="disableGroup"
          v-model="reqCommentParams.content"
          :customTheme="customTheme"
        />
      </div>
      <el-button type="success" plain @click="publishSubComment">发送</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { addComment } from '@/api/comment'
import { useEmoji } from '@/hooks/useEmoji'
import { useUserStore } from '@/store/user'
import { useStore } from '@/store/main'
import { encodeEmoji } from '@/utils/emoji'
import { ElMessage } from 'element-plus'
import { PropType } from 'vue'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
const props = defineProps({
  commentInfo: {
    type: Object as PropType<CommentItemInfo>,
    default: () => {
      return {}
    }
  },
  articleId: {
    type: [String, Number],
    default: 1
  },
  /**
   * 父级评论id 非必须
   */
  parentId: {
    type: [String, Number],
    default: ''
  }
})
const emit = defineEmits(['published'])
const userStrore = useUserStore()
// 二级评论逻辑
let relpycontentShow = ref(false)
const reqCommentParams = reactive<CommentParams>({
  article_id: props.articleId,
  toUid: props.commentInfo.user?.id,
  parent_id: props.parentId != 0 ? props.parentId : props.commentInfo.id,
  user_id: Number(userStrore.userinfo.id),
  nickname: userStrore.userinfo.nickname,
  content: ''
})
console.log(reqCommentParams)
const publishSubComment = async () => {
  if (userStrore.userinfo.id) {
    if (reqCommentParams.content != '') {
      reqCommentParams.content = encodeEmoji(reqCommentParams.content)
      const user = useStore()
      // let parmas = {
      //   article_id: parseInt(this.id),
      //   content: reqCommentParams.content,
      //   user_id: user.user.userId,
      //   username: user.user.username
      // }
      await addComment(reqCommentParams)
      emit('published')
      reqCommentParams.content = ''
      relpycontentShow.value = false
    } else {
      ElMessage.error('输入的内容不能为空')
    }
  } else {
    ElMessage.error('您当前未登录')
  }
}
const { optionsName, disableGroup, customSize, customTheme } = useEmoji()
onMounted(() => {
  // TODO : 在回复给出了本层层主外的人 自动出现一个回复给？？
  // if(props.commentInfo.level&&props.commentInfo.level>1){
  //     emoji.value.setText(`回复给@${props.commentInfo.user.nickname}：`);
  //     reqCommentParams.content=`回复给@${props.commentInfo.user.nickname}：`;
  // }
})
</script>

<style lang="less" scoped>
.relpy-container {
  display: flex;
  flex-direction: column;
  padding: @padding-general;
  align-items: flex-end;
}
.relpy {
  display: flex;
  justify-content: flex-end;
}

.relpycontent {
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
:deep(.emoji-textarea) {
  textarea {
    .border-normal();
    background-color: @bgColor;
  }
  .pollup {
    background-color: @bgColor;
    .shadow();
    .tab-container {
      background-color: @bgColor;
    }
  }
}
</style>
