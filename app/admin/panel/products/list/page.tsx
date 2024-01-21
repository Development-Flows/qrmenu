'use client'
import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  message,
} from 'antd'
import Axios from 'axios'
import { ColumnsType } from 'antd/es/table'
import { IGetProducts, IProduct, IRemoveProductRes } from '../types'
import { FilterDropdownProps } from 'antd/es/table/interface'
const { Option } = Select

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingRemoveProduct, setLoadingRemoveProduct] =
    useState<boolean>(false)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [drawerConfig, setDrawerConfig] = useState<null | IProduct>(null)

  async function fetchProducts() {
    setLoading(true)
    const result: IGetProducts = await Axios.get(`/products/getAll`)
    setLoading(false)
    if (result.status) {
      setProducts(result.data)
    } else {
      //message
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (confirm: FilterDropdownProps['confirm']) => {
    confirm()
  }

  async function removeProductHandler(id: string) {
    setLoadingRemoveProduct(true)
    const result: IRemoveProductRes = await Axios.delete('/products/delete', {
      data: { productId: id },
    })
    if (!result.status)
      return messageApi.open({ type: 'error', content: 'Ürün silme başarısız' })
    setProducts((prevData) => prevData.filter((x) => x._id !== id))
    setLoadingRemoveProduct(false)
  }

  async function productUpdateDrawerHandler(id: string) {
    setDrawerIsOpen(true)
    setDrawerConfig(products.find((x) => x._id === id) ?? null)
  }

  async function productUpdateHandler(a) {
    console.log('productUpdateHandler func', a)
  }

  const [messageApi, contextHolder] = message.useMessage()

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
  }

  const columns: ColumnsType<IProduct> = [
    {
      title: 'Ürün Id',
      key: '_id',
      dataIndex: '_id',
    },
    {
      title: 'Ürün Adı',
      key: 'name',
      dataIndex: 'name',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            placeholder={`Ürün ismi ara`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(confirm)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(confirm)}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false })
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close()
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        return record['name']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
      },
    },
    {
      title: 'Stok',
      key: 'stock',
      dataIndex: 'stock',
    },
    {
      title: 'Satış Fiyatı',
      key: 'priceSale',
      dataIndex: 'priceSale',
    },
    {
      title: 'Açıklama',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: '',
      key: 'buttons',
      dataIndex: '_id',
      render: (value) => {
        return (
          <Button
            loading={loadingRemoveProduct}
            onClick={() => productUpdateDrawerHandler(value)}
          >
            Düzenle
          </Button>
        )
      },
    },
    //{
    //  title: '',
    //  key: 'buttons',
    //  dataIndex: '_id',
    //  render: (value) => {
    //    return (
    //      <Button
    //        loading={loadingRemoveProduct}
    //        onClick={() => removeProductHandler(value)}
    //      >
    //        Sil
    //      </Button>
    //    )
    //  },
    //},
  ]

  return (
    <div>
      <Drawer
        title="Basic Drawer"
        onClose={() => setDrawerIsOpen(false)}
        open={drawerIsOpen}
      >
        <pre>{JSON.stringify(drawerConfig, null, 2)}</pre>
        {drawerConfig && (
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={productUpdateHandler}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  initialValue={drawerConfig.name}
                  label="Name"
                  rules={[
                    { required: true, message: 'Please enter user name' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priceSale"
                  label="Ürün Fiyatı"
                  initialValue={drawerConfig.priceSale}
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="menuIds"
                  label="Bulunduğu Menüler"
                  initialValue={drawerConfig.menuIds}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Sahip olduğu menüler"
                  >
                    {drawerConfig.menuIds.map((menuId) => (
                      <Option key={menuId} value={menuId}>
                        {menuId}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="menuIds"
                  label="Bulunduğu Menüler"
                  initialValue={drawerConfig.isActive}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Aktiflik Durumu"
                    value={drawerConfig.isActive}
                  >
                    <Option key={1} value={true}>
                      Açık
                    </Option>
                    <Option key={2} value={false}>
                      Kapalı
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Açıklama alanı"
                  initialValue={drawerConfig.description}
                >
                  <Input.TextArea
                    rows={2}
                    placeholder="Açıklama girebilirsiniz.."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={products}
        rowKey={'_id'}
      />
    </div>
  )
}
export default ProductList
