/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App() {
  const {
    loading, 
    fromLanguage, 
    toLanguage, 
    fromText, 
    result, 
    interchangeLanguages, 
    setFromLanguage, 
    setToLanguage, 
    setFromText, 
    setResult
  } = useStore()
  
  useEffect(() => {
    if (fromText === '') return

    translate({fromLanguage, toLanguage, text: fromText})
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => {setResult('Error')})
  }, [fromText, fromLanguage, toLanguage])

  return (
    <>
      <Container fluid>
        <h2>Google Translate Clone</h2>

        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector type='from' value={fromLanguage} onChange={setFromLanguage} />
              <TextArea type='from' value={fromText} onChange={setFromText} />
            </Stack>
          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector type='to' value={toLanguage} onChange={setToLanguage} />
              <TextArea loading={loading} type='to' value={result} onChange={setResult} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
