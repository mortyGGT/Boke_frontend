<template>
  <div class="container">
    <div class="switch-btn">
      <p class="text" @click="changeEditorName(editorName)">
        切换{{ editorName === 'tinymce' ? 'markdown' : '富文本' }}编辑器
      </p>
    </div>
    <div v-if="editorName == 'tinymce'">
      <Editor
        api-key="123"
        :init="editorInit"
        v-model="contentRich.html"
        tinymce-script-src="/tinymce/tinymce.min.js"
      />
    </div>
    <div v-else id="markdown">
      <MdEditor
        v-model="content.text"
        ref="mdeditor"
        :theme="theme.theme === 'dark' ? 'dark' : 'light'"
        @onHtmlChanged="saveHtml"
        @onUploadImg="onUploadImg"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { uploadImage } from '@/api/article'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useThemeStore } from '@/store/theme'
interface LocalSave {
  html?: string
  saveContent?: Content
  saveContentRich?: Content
  defaultEditor?: string
}
const props = withDefaults(defineProps<LocalSave>(), {
  html: '',
  defaultEditor: 'tinymce'
})
const emit = defineEmits(['changeContent', 'changeContentRich', 'changeEditor'])
// 当前tag名 默认富文本
const theme = useThemeStore()
let editorName = ref(props.defaultEditor)
// v-model
// markdown绑定的对象
let content = reactive<Content>({
  html: '',
  text: ''
})
// 富文本编辑器绑定的对象
let contentRich = reactive<Content>({
  html: '',
  text: ''
})
// 如果有本地存储 读取本地存储
if (props.saveContent) {
  content.html = props.saveContent.html
  content.text = props.saveContent.text
}
if (props.saveContentRich) {
  contentRich.html = props.saveContentRich.html
  contentRich.text = props.saveContentRich.text
}
// tinyMce编辑器
let editorInit = {
  // language_url: "/public/tinymce/zh_CN.js",  //开发环境下
  language_url: '/tinymce/langs/zh_CN.js', //生产环境
  language: 'zh_CN',
  height: 500,
  plugins: [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'code',
    'fullscreen',
    'visualblocks',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount'
  ],
  toolbar:
    'undo redo | formatselect | bold italic backcolor forecolor  | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
  images_upload_handler: (blobInfo: { blob: () => string | Blob }) =>
    new Promise((resolve, reject) => {
      let formdata = new FormData()
      formdata.append('image', blobInfo.blob())
      uploadImage(formdata).then(result => {
        if (result.data.status == 200) {
          resolve(result.data.url)
        } else {
          reject('上传失败')
        }
      })
    })
}
const saveHtml = (val: string) => {
  content.html = val
}
// markdown图片上传逻辑
const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    Array.from(files).map(file => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('image', file)
        uploadImage(form)
          .then((result: any) => {
            rev(result)
          })
          .catch((err: any) => {
            rej(err)
          })
      })
    })
  )
  callback(res.map((item: any) => item.data.url))
}
const changeEditorName = (val: string) => {
  val === 'tinymce' ? (editorName.value = 'markdown') : (editorName.value = 'tinymce')
}
// 区分开两个编辑器分别传不同的值..... 这里需要
watch(content, newValue => {
  emit('changeContent', newValue)
})
// 富文本改变
watch(contentRich, newValue => {
  emit('changeContentRich', newValue)
})
watch(editorName, newValue => {
  emit('changeEditor', newValue)
})
// tinyMce编辑器
</script>

<style scoped lang="less">
@import url(./MyEditor.less);
</style>
