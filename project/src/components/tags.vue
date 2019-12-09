<template>
  <div>
  <el-tag
    :key="tag"
    v-for="tag in dynamicTags"
    :closable="closeable"
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput" type="primary">添加标签</el-button>
  </div>
</template>

<script>
export default {
  name: 'tags',
  data () {
    return {
      dynamicTags: this.$props.input,
      inputVisible: false,
      inputValue: ''
    }
  },
  props: ['input', 'closeable'],
  watch: {
    input (newValue, oldValue) {
      this.dynamicTags = newValue
    }
  },
    methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$emit('update', this.dynamicTags)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.$emit('update', this.dynamicTags)
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
