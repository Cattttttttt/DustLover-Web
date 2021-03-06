import React from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { DeleteOutlineOutlined } from '@material-ui/icons'

interface DeleteButtonProps {
  handleDelete: () => void,
  size?: 'small'|'medium',
  fontSize?: 'inherit'|'default'|'small'|'large',
  [prop: string]: any
}

const DeleteButton = (props: DeleteButtonProps) => {

  const [anchorE1, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    props.handleDelete()
    handleClose()
  }

  return (
    <>
      <IconButton onClick={handleClick} size={props.size}>
        <DeleteOutlineOutlined fontSize={props.fontSize} />
      </IconButton>
      <Menu
        id="delete-menu"
        anchorEl={anchorE1}
        keepMounted
        open={Boolean(anchorE1)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>确认删除</MenuItem>
        <MenuItem onClick={handleClose}>取消</MenuItem>
      </Menu>
    </>
  )
}

export default DeleteButton