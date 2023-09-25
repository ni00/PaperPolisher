<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Delete, DocumentAdd, CopyDocument, MessageBox, Setting } from '@element-plus/icons-vue'
import DiffMatchPatch from 'diff-match-patch'
import { ElMessage } from 'element-plus'

const beforeText = ref('')
const afterText = ref('')
const compareText = ref('')
const dialogVisible = ref(false)
const prompt = computed(() => window.api.prompt.zh)
const env = ref(
  JSON.parse(localStorage.getItem('env')) || {
    api: 'https://api.openai.com/v1/chat/completions',
    key: 'sk-xxx',
    model: 'gpt-3.5-turbo'
  }
)
const btns = [
  { label: '润色', prompt: prompt.value.enhance },
  { label: '改写', prompt: prompt.value.revise },
  { label: '扩写', prompt: prompt.value.expand },
  { label: '缩写', prompt: prompt.value.summary },
  { label: '译写', prompt: prompt.value.translate }
]

watch([beforeText, afterText], (val) => {
  if (val) {
    const dmp = new DiffMatchPatch()
    const diff = dmp.diff_main(beforeText.value, afterText.value)
    const htmlStr = dmp.diff_prettyHtml(diff)
    compareText.value = htmlStr
  }
})

const successMsg = (text: string) => {
  ElMessage({
    message: `${text}成功!`,
    type: 'success'
  })
}
const warningMsg = (text: string) => {
  ElMessage({
    message: `${text}失败!`,
    type: 'warning'
  })
}

const handleImport = async () => {
  try {
    beforeText.value = await window.api.openFile()
    successMsg('导入')
  } catch (e) {
    warningMsg('导入')
  }
}

const handlePaste = async () => {
  try {
    beforeText.value = beforeText.value + (await window.api.pasteText())
    successMsg('粘贴')
  } catch (e) {
    warningMsg('粘贴')
  }
}

const handleSave = async () => {
  try {
    await window.api.saveFile(afterText.value)
    successMsg('导出')
  } catch (e) {
    warningMsg('导出')
  }
}

const handleCopy = async () => {
  try {
    await window.api.copyText(afterText.value)
    successMsg('复制')
  } catch (e) {
    warningMsg('复制')
  }
}

const handleEnv = () => {
  try {
    localStorage.setItem('env', JSON.stringify(env.value))
    successMsg('设置')
    dialogVisible.value = false
  } catch (e) {
    warningMsg('设置')
  }
}

const loading = ref(false)
const handleSend = (p: string, t: string) => {
  loading.value = true
  window.api
    .sendToOpenAI(
      env.value.api || 'https://api.openai.com/v1/chat/completions',
      env.value.key,
      env.value.model,
      p,
      beforeText.value
    )
    .then((res) => {
      afterText.value = res.data.choices[0].message.content || ''
      successMsg(t)
    })
    .catch((e) => {
      console.log(e)
      warningMsg(t)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="flex flex-col p-1">
    <div class="flex flex-row w-full">
      <div class="p-2 w-full">
        <el-button-group class="mb-2">
          <el-button :icon="DocumentAdd" @click="handleImport">导入</el-button>
          <el-button :icon="CopyDocument" @click="handlePaste">粘贴</el-button>
          <el-button :icon="Delete" @click="beforeText = ''">清空</el-button>
        </el-button-group>
        <el-input
          v-model="beforeText"
          clearable
          class="text-base"
          :rows="15"
          type="textarea"
          resize="none"
          placeholder="修改前内容"
        />
      </div>
      <div class="p-2 flex flex-col justify-around pt-8">
        <el-button v-for="btn in btns" :key="btn.label" @click="handleSend(btn.prompt, btn.label)">
          <span class="text-black">{{ btn.label }}</span>
        </el-button>
        <el-button :icon="Setting" @click="dialogVisible = true">设置</el-button>
      </div>
      <div class="p-2 w-full">
        <el-button-group class="mb-2 flex flex-row justify-end">
          <el-button :icon="MessageBox" @click="handleSave">导出</el-button>
          <el-button :icon="CopyDocument" @click="handleCopy">复制</el-button>
          <el-button :icon="Delete" @click="afterText = ''">清空</el-button>
        </el-button-group>
        <el-input
          v-model="afterText"
          v-loading="loading"
          clearable
          class="text-base"
          :rows="15"
          type="textarea"
          resize="none"
          placeholder="修改后内容"
        />
      </div>
    </div>
    <div class="w-full p-2">
      <div class="w-full border border-gray-300 rounded p-2" v-html="compareText"></div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="设置">
    <el-form :model="env">
      <el-form-item label="API 地址" label-width="80">
        <el-input
          v-model="env.api"
          autocomplete="off"
          placeholder="https://api.openai.com/v1/chat/completions"
        />
      </el-form-item>
      <el-form-item label="API 密钥" label-width="80">
        <el-input v-model="env.key" autocomplete="off" placeholder="sk-xxx" />
      </el-form-item>
      <el-form-item label="LLM 模型" label-width="80">
        <el-select v-model="env.model" placeholder="请选择模型">
          <el-option label="gpt-3.5-turbo" value="gpt-3.5-turbo" />
          <el-option label="gpt-4" value="gpt-4" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" class="text-black" @click="handleEnv"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less">
.el-button + .el-button {
  margin-left: 0;
}
</style>
