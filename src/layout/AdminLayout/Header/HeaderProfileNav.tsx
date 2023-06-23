import {
   Dropdown, Nav, NavItem,
} from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios'
import { useRouter } from 'next/router'

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}

export default function HeaderProfileNav() {
  const router = useRouter()

  const logout = async () => {
    const res = await axios.post('/api/mock/logout')
    if (res.status === 200) {
      router.push('/login')
    }
  }

  return (
    <Nav>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle variant="link" bsPrefix="hide-caret" className="py-0 px-2 rounded-0" id="dropdown-profile">
          <div className="avatar position-relative">
            <Image
              fill
              className="rounded-circle"
              src="/assets/img/avatars/8.jpg"
              alt="user@email.com"
            />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="pt-0">
          <Dropdown.Header className="bg-light fw-bold rounded-top">Coming soon</Dropdown.Header>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  )
}
