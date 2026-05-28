'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, ImagePlus, X, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { getCategories } from '@/lib/data/categories'
import { getCollections } from '@/lib/data/collections'
import { generateSlug } from '@/lib/utils/format'
import { toast } from 'sonner'

/**
 * Product Create/Edit Form
 * 
 * TODO: Connect to Supabase for data persistence
 * TODO: Integrate Cloudinary for image uploads
 */

interface ProductFormData {
  title: string
  slug: string
  description: string
  price: string
  sale_price: string
  currency: string
  stock: string
  active: boolean
  category_id: string
  collections: string[]
  image_urls: string[]
  variants: Array<{ name: string; value: string; price: string; stock: string }>
  personalization_fields: Array<{ label: string; required: boolean; max_length: string }>
}

export default function AdminProductNewPage() {
  const router = useRouter()
  const categories = getCategories()
  const collections = getCollections()

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    slug: '',
    description: '',
    price: '',
    sale_price: '',
    currency: 'XCG',
    stock: '',
    active: true,
    category_id: '',
    collections: [],
    image_urls: [''],
    variants: [],
    personalization_fields: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleAddImageUrl = () => {
    setFormData({
      ...formData,
      image_urls: [...formData.image_urls, ''],
    })
  }

  const handleRemoveImageUrl = (index: number) => {
    setFormData({
      ...formData,
      image_urls: formData.image_urls.filter((_, i) => i !== index),
    })
  }

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.image_urls]
    newUrls[index] = value
    setFormData({ ...formData, image_urls: newUrls })
  }

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: '', value: '', price: '', stock: '' }],
    })
  }

  const handleRemoveVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    })
  }

  const handleVariantChange = (index: number, field: keyof ProductFormData['variants'][0], value: string) => {
    const newVariants = [...formData.variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setFormData({ ...formData, variants: newVariants })
  }

  const handleAddPersonalization = () => {
    setFormData({
      ...formData,
      personalization_fields: [...formData.personalization_fields, { label: '', required: false, max_length: '' }],
    })
  }

  const handleRemovePersonalization = (index: number) => {
    setFormData({
      ...formData,
      personalization_fields: formData.personalization_fields.filter((_, i) => i !== index),
    })
  }

  const handlePersonalizationChange = (index: number, field: keyof ProductFormData['personalization_fields'][0], value: string | boolean) => {
    const newFields = [...formData.personalization_fields]
    newFields[index] = { ...newFields[index], [field]: value }
    setFormData({ ...formData, personalization_fields: newFields })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Save to Supabase
    console.log('Product data:', formData)

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Product created successfully')
    router.push('/admin/products')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="rounded-xl">
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground mt-1">Create a new product in your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Product title"
                  className="mt-1.5 rounded-xl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="product-slug"
                  className="mt-1.5 rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                className="mt-1.5 rounded-xl"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger className="mt-1.5 rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="mt-1.5 rounded-xl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sale_price">Sale Price</Label>
                <Input
                  id="sale_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.sale_price}
                  onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                  placeholder="0.00"
                  className="mt-1.5 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={formData.currency} 
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger className="mt-1.5 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XCG">XCG</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="mt-1.5 rounded-xl"
                  required
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="active">Product is active</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Images</CardTitle>
            <p className="text-sm text-muted-foreground">
              {/* TODO: Replace URL inputs with Cloudinary upload widget */}
              Add image URLs. Cloudinary integration coming soon.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.image_urls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="rounded-xl"
                />
                {formData.image_urls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveImageUrl(index)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddImageUrl} className="rounded-xl">
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Image URL
            </Button>
          </CardContent>
        </Card>

        {/* Variants */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Variants</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add size, color, or other product options
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.variants.map((variant, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={variant.name}
                    onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                    placeholder="e.g., Size"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Value</Label>
                  <Input
                    value={variant.value}
                    onChange={(e) => handleVariantChange(index, 'value', e.target.value)}
                    placeholder="e.g., Large"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-24">
                  <Label className="text-xs">Stock</Label>
                  <Input
                    type="number"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                    placeholder="0"
                    className="rounded-xl"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveVariant(index)}
                  className="text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddVariant} className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add Variant
            </Button>
          </CardContent>
        </Card>

        {/* Personalization Fields */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Personalization</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add fields for custom engraving, messages, etc.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.personalization_fields.map((field, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => handlePersonalizationChange(index, 'label', e.target.value)}
                    placeholder="e.g., Engraving Text"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-24">
                  <Label className="text-xs">Max Length</Label>
                  <Input
                    type="number"
                    value={field.max_length}
                    onChange={(e) => handlePersonalizationChange(index, 'max_length', e.target.value)}
                    placeholder="50"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center gap-2 pb-2">
                  <Switch
                    checked={field.required}
                    onCheckedChange={(checked) => handlePersonalizationChange(index, 'required', checked)}
                  />
                  <Label className="text-xs">Required</Label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemovePersonalization(index)}
                  className="text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddPersonalization} className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add Personalization Field
            </Button>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-foreground text-background hover:bg-foreground/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </Button>
          <Button type="button" variant="outline" asChild className="rounded-xl">
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
