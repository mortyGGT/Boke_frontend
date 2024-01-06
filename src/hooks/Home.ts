import { currentUserApi, updateUserInfoApi } from '@/api/user'
import { useUserStore } from '@/store/user'
import { ElMessage, ElForm } from 'element-plus'
import { validateEmail, validateJianjie, validateNickname } from '@/utils/validate'
import { useStore } from '@/store/main'
import defaultAvatar from '@/assets/img/404img1200.jpg'

const userStore = useUserStore()

export const useHomeIndex = () => {
  const formAllinfo = reactive<UpdateUserInfoParams>({
    email: '未设置',
    nickname: '',
    gender: '1',
    introduce: '',
    banner: '',
    avatar: ''
  })
  const currentUser = reactive<UserAll>({
    id: '',
    username: '',
    nickname: '',
    role: '',
    email: '',
    gender: '',
    date: '',
    banner: '',
    avatar: '',
    introduce: '',
    sex: '',
    award: 0
  })
  const getAllinfo = async () => {
    const userstore = useStore()
    const id = userstore.user.userId
    const { data } = await currentUserApi(id)
    const i = data.data
    currentUser['id'] = i.id
    currentUser['username'] = i.username
    currentUser['nickname'] = i.nickname
    currentUser['role'] = i.role
    currentUser['email'] = i.email ? i.email : '未设置'
    currentUser['gender'] = i.gender ? i.gender.toString() : '1'
    currentUser['date'] = i.created_at
    currentUser['banner'] = i.banner
    currentUser['avatar'] = i.avatar || defaultAvatar
    currentUser['introduce'] = i.introduce
    currentUser['award'] = i.award
    formAllinfo['email'] = i.email ? i.email : '未设置'
    formAllinfo['nickname'] = i.nickname
    formAllinfo['gender'] = i.gender ? i.gender.toString() : '1'
    formAllinfo['introduce'] = i.introduce
    formAllinfo['banner'] = i.banner
    formAllinfo['avatar'] = i.avatar
    userStore.setUser(currentUser)
  }
  const changeAvatar = (link: string) => {
    formAllinfo.avatar = link
    updateUserInfo()
  }

  const changeBanner = (bannerUrl: string) => {
    formAllinfo.banner = bannerUrl
    updateUserInfo()
  }
  //修改表单 的处理函数
  const changeInfo = async () => {
    await updateUserInfo()
    await getAllinfo()
    const userstore = useStore()
    const id = userstore.user.userId
    const { data } = await currentUserApi(id)
    userStore.setUser(data.data)
  }

  // 编辑资料完成 调用api修改资料
  const updateUserInfo = async () => {
    const userstore = useStore()
    const id = userstore.user.userId
    const { data } = await updateUserInfoApi(id, formAllinfo)
    if (data.status === 200) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error(data.message)
    }
    getAllinfo()
  }
  // 组件加载
  onMounted(() => {
    getAllinfo()
  })

  return {
    changeInfo,
    updateUserInfo,
    changeBanner,
    changeAvatar,
    currentUser,
    formAllinfo
  }
}
export const useFormGroup = emit => {
  // 表单校验规则
  const rules = reactive({
    nickname: [{ required: true, validator: validateNickname, trigger: 'blur' }],
    email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
    introduce: [{ required: true, validator: validateJianjie, trigger: 'blur' }]
  })
  // 控制表单编辑
  const isEdit = ref(false)
  // 获取表单实例
  type FormInstance = InstanceType<typeof ElForm>
  const formInstance = ref<FormInstance>()
  // 控制编辑资料
  const changeIsEdit = (val: boolean) => {
    isEdit.value = val
  }
  // 完成资料  获取表单 校验 发布
  const formSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) {
      return false
    }
    formEl.validate(async vaild => {
      if (vaild) {
        //校验成功 把修改好的值传出去
        isEdit.value = false
        emit('changeInfo')
      } else {
        ElMessage.error('请校验表单')
        return false
      }
    })
  }
  return {
    formSubmit,
    changeIsEdit,
    formInstance,
    rules,
    isEdit
  }
}
