'use client'
import React, {useEffect, useRef, useState,} from 'react'
import * as Yup from "yup";
import {
    Button,
    Drawer,
    Input,
    Select,
    Space,
    Table,
    message, InputNumber, Checkbox,
} from 'antd'
import Axios from 'axios'
import {ColumnsType} from 'antd/es/table'
import {IGetProducts, IMenu, IProduct, IRemoveProductRes, IUpdateProduct} from '../types'
import {FilterDropdownProps} from 'antd/es/table/interface'
import {useFormik} from "formik";
import style from './page.module.scss'

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingRemoveProduct, setLoadingRemoveProduct] =
        useState<boolean>(false)
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [menuList, setMenuList] = useState<IMenu[]>([])

    async function fetchProducts() {
        setLoading(true)
        const result: IGetProducts = await Axios.get(`/products/getAll`)
        setLoading(false)
        if (result.status) {
            setProducts(result.data)
        } else {
            messageApi.open({type: 'error', content: 'result status yok!'})
        }
    }

    async function fetchMenuList() {
        const result = await Axios.get(`/menu/getAll`)
        if (result.status) {
            setMenuList(result.data)
        }
    }

    async function productUpdateQueryHandler(productParams: IUpdateProduct) {
        const result = await Axios.post(`/products/update/${productParams.productId}`, productParams)
        if (result.status) {
            return messageApi.open({type: 'success', content: 'Ürün Güncelleme Başarılı'})
        }
        return messageApi.open({type: 'success', content: 'Ürün Güncelleme Başarılı'})
    }

    useEffect(() => {
        fetchProducts()
        fetchMenuList()
    }, [])

    const handleSearch = (confirm: FilterDropdownProps['confirm']) => {
        confirm()
    }

    async function removeProductHandler(id: string) {
        setLoadingRemoveProduct(true)
        const result: IRemoveProductRes = await Axios.delete('/products/delete', {
            data: {productId: id},
        })
        if (!result.status)
            return messageApi.open({type: 'error', content: 'Ürün silme başarısız'})
        setProducts((prevData) => prevData.filter((x) => x._id !== id))
        setLoadingRemoveProduct(false)
    }

    async function productUpdateDrawerHandler(id: string) {
        const getProductDetail = products.find((x) => x._id === id) ?? null
        if (getProductDetail) {
            setDrawerIsOpen(true)
            await productFormik.setValues({
                name: getProductDetail.name,
                description: getProductDetail.description,
                isActive: getProductDetail.isActive,
                menuIds: getProductDetail.menuIds,
                priceSale: getProductDetail.priceSale,
                productId: getProductDetail._id
            })
        } else {
            messageApi.open({
                type: 'error',
                content: 'Bir Hata Oluştu',
            })
        }
    }

    async function productUpdateHandler(productDetail: IUpdateProduct) {
        console.log('productUpdateHandler func', productDetail)
        productUpdateQueryHandler(productDetail)
        setDrawerIsOpen(false);
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
                <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        placeholder={`Ürün ismi ara`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(confirm)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(confirm)}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{width: 90}}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({closeDropdown: false})
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

    const firmInitialValue = {
        name: "",
        priceSale: 0,
        menuIds: [],
        isActive: true,
        description: '',
        productId: ""
    };

    const productFormik = useFormik({
        initialValues: firmInitialValue,
        validateOnChange: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Zorunlu Alan"),
            priceSale: Yup.string().required("Zorunlu Alan")
        }),
        onSubmit: (values) => {
            productFormik.resetForm();
            productUpdateHandler(values);
        }
    });

    const formRef = useRef(null);

    function formButtonSubmitHandler(e) {
        e.preventDefault()
        e.stopPropagation()

        productFormik.handleSubmit()
    }


    return (
        <div>
            <Drawer
                title="Basic Drawer"
                onClose={() => setDrawerIsOpen(false)}
                open={drawerIsOpen}
            >
                {productFormik.values && menuList && (
                    <form ref={formRef} className={style.productDetailForm}>
                        <div className={style.formItem}>
                            <div className={style.label}>Ürün İsmi</div>
                            <Input onChange={productFormik.handleChange} value={productFormik.values.name}
                                   name={"name"}/>
                        </div>

                        <div className={style.formItem}>
                            <div className={style.label}>Ürün Fiyat</div>
                            <InputNumber onChange={(value) => productFormik.setFieldValue("priceSale", value)} min={1}
                                         value={productFormik.values.priceSale} name={"priceSale"}/>
                        </div>

                        <div className={style.formItem}>
                            <div className={style.label}>Bulunduğu Menüler</div>
                            <Select
                                mode={'multiple'}
                                placeholder="Sahip olduğu Menü"
                                name={"menuIds"}
                                defaultValue={productFormik.values.menuIds}
                                onChange={(value: string[] | undefined) => productFormik.setFieldValue("menuIds", value)}
                            >{menuList.map((menuItem) => <Select.Option
                                value={menuItem._id}>{menuItem.name}</Select.Option>)}</Select>
                        </div>

                        <div className={style.formItem}>
                            <div className={style.label}><Checkbox name={"isActive"}
                                                                   checked={productFormik.values.isActive}
                                                                   onChange={(event) => productFormik.setFieldValue("isActive", event.target.checked)}>Aktiflik
                                Durumu</Checkbox>
                            </div>

                        </div>

                        <div className={style.formItem}>
                            <div className={style.label}>Ürün Açıklama</div>
                            <Input.TextArea
                                name={"description"}
                                value={productFormik.values.description}
                                onChange={(event) => productFormik.setFieldValue("description", event.target.value)}
                                style={{width: '100%'}}
                                placeholder="Açıklama girebilirsiniz.."
                            />
                        </div>

                        <Button type={'primary'} onClick={formButtonSubmitHandler}>Kaydet</Button>

                    </form>
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
