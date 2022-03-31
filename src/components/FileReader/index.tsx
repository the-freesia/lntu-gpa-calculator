import { useEffect, useRef, useState } from 'react'
import './index.css'
import GradePointAverage from '../../utils/GPA'
import { ResultType } from '../../utils/Types'

interface FRCprops {
  setGPAData: React.Dispatch<React.SetStateAction<ResultType>>
}

const FileReaderComponent: React.FC<FRCprops> = ({ setGPAData }) => {
  const [fileInfo, setFileInfo] = useState({
    name: '',
    size: '',
  })

  const [loaded, setLoaded] = useState(false)
  const [computed, setComputed] = useState(false)

  const file = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (fileInfo.size !== '') {
      setLoaded(true)
      setComputed(false)
    }
  }, [fileInfo])

  //   const GPAStat = useContext(AppContext)

  const calculate = () => {
    if (file.current?.files) {
      if (!file.current.files[0]) {
        alert('请选择文件')
        return
      }
    }
    setComputed(true)
    let fileReader = new FileReader()
    const currentFile = file?.current?.files![0]
    fileReader.readAsText(currentFile as File, 'utf-8')
    fileReader.onloadend = function (evt) {
      // 在文件读取完毕后，其内容将被保存在result属性中
      const content = evt.target!.result
      try {
        const gpa = new GradePointAverage(content as string)
        setGPAData(gpa.gpaAndWAM)
      } catch (error) {
        alert('文件格式错误或内容异常，请重新选择')
        console.log(error)
        setComputed(false)
        setLoaded(false)
      }
    }
  }

  return (
    <>
      <div className={'fileReader'}>
        <input
          type="file"
          name="file"
          id="file"
          className={'hidden'}
          ref={file}
          onChange={(event) => {
            setFileInfo({
              name: event.target.files![0].name || '',
              size: event.target.files![0].size + ' Bytes' || '',
            })
          }}
        />
        <label htmlFor="file" className={'Btn selectBtn'}>
          选择文件
        </label>
        <label className={'Btn calculateBtn'} onClick={calculate}>
          计算成绩{' '}
        </label>
      </div>
      {loaded ? (
        <div className="notice">
          <p className={'notice-item'}>
            {computed ? '计算结果如下' : '文件已加载'}
          </p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default FileReaderComponent
