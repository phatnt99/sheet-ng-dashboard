import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import {
  Card,
  Form,
  Button,
} from 'react-bootstrap'
import React, { useState } from 'react'

const Home: NextPage = () => {
  const proxyBaseUrl = 'view-counter';
  const [surl, setSurl] = useState('');
  const [sid, setSid] = useState('');
  const [path, setPath] = useState('');
  const [resultImg, setResultImg] = useState('');

  const getSid = (url: string) => {
    const reg: RegExp = new RegExp('https://script.google.com/macros/s/(.*)/exec');
    let found = reg.exec(url);
    setSid(found ? found[1] : '');
  }

  const onSurl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSurl(e.target.value);
    getSid(e.target.value);

  }

  const onPath = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPath(e.target.value);
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('click');
    if (!sid || !path) {
      setResultImg('Error: cannot read Google Script Id or New Path, please check again');
      return;
    }
    // create proxy url
    let proxyUrl = `${process.env.NEXT_PUBLIC_VERCEL_API_URL}${proxyBaseUrl}?sid=${sid}&p=${path}`;
    let imgTag = `<img src='${proxyUrl}' />`;
    // return result
    setResultImg(imgTag);
  }

  return (
    <AdminLayout>
      <h5>Create a view counter</h5>
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Google App Script Url</Form.Label>
              <Form.Control onChange={(e) => onSurl(e)} type="text" placeholder="https://script.google.com/macros/s/xxxx/exec" />
              <Form.Text className="text-muted">
                {sid && `Your Google Script ID: ${sid}`}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Path</Form.Label>
              <Form.Control onChange={(e) => onPath(e)} type="text" placeholder="hello-world" />
            </Form.Group>

            <Button variant="primary" onClick={(e) => onClick(e)}>
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {resultImg &&
        <Card className="mb-4">
          <Card.Body>
            <textarea style={{ width: '100%', height: 'auto' }} value={resultImg} readOnly>
            </textarea>
            <p className="text-muted">Copy the above img tag and place in your site.</p>
          </Card.Body>
        </Card>
      }
    </AdminLayout>
  )
}

export default Home
