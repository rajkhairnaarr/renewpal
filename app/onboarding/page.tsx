"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Check, Building, Users, Calendar, Bell } from "lucide-react"
import { ONBOARDING_STEPS, RENEWAL_CATEGORIES } from "@/lib/constants"
import { useToast } from "@/hooks/use-toast"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationSlug: "",
    industry: "",
    teamSize: "",
    role: "",
    integrations: [] as string[],
    sampleData: true,
    firstRenewal: {
      title: "",
      category: "",
      vendor: "",
      amount: "",
      renewalDate: "",
    }
  })
  
  const router = useRouter()
  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateFirstRenewal = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      firstRenewal: {
        ...prev.firstRenewal,
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      toast({
        title: "Welcome to RenewalPal!",
        description: "Your account has been set up successfully.",
      })
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />
      case 2:
        return <OrganizationStep />
      case 3:
        return <RoleStep />
      case 4:
        return <FirstRenewalStep />
      case 5:
        return <CompleteStep />
      default:
        return <WelcomeStep />
    }
  }

  const WelcomeStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to RenewalPal!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Let's get you set up in just a few minutes. We'll help you create your organization 
        and add your first renewal to track.
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          <span>Track all your renewals in one place</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          <span>Get smart notifications before deadlines</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          <span>Collaborate with your team</span>
        </div>
      </div>
    </div>
  )

  const OrganizationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell us about your organization
        </h2>
        <p className="text-gray-600">
          This will help us customize your experience
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            id="organizationName"
            value={formData.organizationName}
            onChange={(e) => updateFormData("organizationName", e.target.value)}
            placeholder="Acme Corporation"
          />
        </div>
        
        <div>
          <Label htmlFor="organizationSlug">Organization URL</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              renewalpal.com/
            </span>
            <Input
              id="organizationSlug"
              value={formData.organizationSlug}
              onChange={(e) => updateFormData("organizationSlug", e.target.value)}
              placeholder="acme-corp"
              className="rounded-l-none"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="industry">Industry (Optional)</Label>
          <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="teamSize">Team Size</Label>
          <Select value={formData.teamSize} onValueChange={(value) => updateFormData("teamSize", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-200">51-200 employees</SelectItem>
              <SelectItem value="200+">200+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const RoleStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          How will you use RenewalPal?
        </h2>
        <p className="text-gray-600">
          This helps us set up the right permissions and features
        </p>
      </div>
      
      <div className="grid gap-4">
        <Card 
          className={`cursor-pointer transition-all ${
            formData.role === "admin" ? "ring-2 ring-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => updateFormData("role", "admin")}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className={`h-4 w-4 ${formData.role === "admin" ? "text-blue-600" : "text-gray-400"}`} />
              <span>Admin</span>
            </CardTitle>
            <CardDescription>
              I manage renewals and team members. I need full access to all features.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all ${
            formData.role === "manager" ? "ring-2 ring-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => updateFormData("role", "manager")}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className={`h-4 w-4 ${formData.role === "manager" ? "text-blue-600" : "text-gray-400"}`} />
              <span>Manager</span>
            </CardTitle>
            <CardDescription>
              I oversee renewals and need to track progress and costs.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-all ${
            formData.role === "member" ? "ring-2 ring-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => updateFormData("role", "member")}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className={`h-4 w-4 ${formData.role === "member" ? "text-blue-600" : "text-gray-400"}`} />
              <span>Team Member</span>
            </CardTitle>
            <CardDescription>
              I work with renewals and need to stay updated on deadlines.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Label>Integrations (Optional)</Label>
        <div className="grid grid-cols-2 gap-3">
          {["Google Calendar", "Slack", "Microsoft Teams", "Email"].map((integration) => (
            <div key={integration} className="flex items-center space-x-2">
              <Checkbox
                id={integration}
                checked={formData.integrations.includes(integration)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData("integrations", [...formData.integrations, integration])
                  } else {
                    updateFormData("integrations", formData.integrations.filter(i => i !== integration))
                  }
                }}
              />
              <Label htmlFor={integration} className="text-sm cursor-pointer">
                {integration}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const FirstRenewalStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add your first renewal
        </h2>
        <p className="text-gray-600">
          Let's start tracking your renewals right away
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="renewalTitle">Renewal Title</Label>
          <Input
            id="renewalTitle"
            value={formData.firstRenewal.title}
            onChange={(e) => updateFirstRenewal("title", e.target.value)}
            placeholder="e.g., Adobe Creative Suite License"
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.firstRenewal.category} onValueChange={(value) => updateFirstRenewal("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {RENEWAL_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            value={formData.firstRenewal.vendor}
            onChange={(e) => updateFirstRenewal("vendor", e.target.value)}
            placeholder="e.g., Adobe Inc."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.firstRenewal.amount}
              onChange={(e) => updateFirstRenewal("amount", e.target.value)}
              placeholder="0.00"
            />
          </div>
          
          <div>
            <Label htmlFor="renewalDate">Renewal Date</Label>
            <Input
              id="renewalDate"
              type="date"
              value={formData.firstRenewal.renewalDate}
              onChange={(e) => updateFirstRenewal("renewalDate", e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="sampleData"
          checked={formData.sampleData}
          onCheckedChange={(checked) => updateFormData("sampleData", checked)}
        />
        <Label htmlFor="sampleData" className="text-sm cursor-pointer">
          Add sample renewals to help me get started
        </Label>
      </div>
    </div>
  )

  const CompleteStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        You're all set!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Welcome to RenewalPal! Your account has been created and you're ready to start 
        tracking your renewals. We'll send you a welcome email with next steps.
      </p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          <span>Organization created: {formData.organizationName}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500" />
          <span>First renewal added</span>
        </div>
        {formData.sampleData && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Check className="h-4 w-4 text-green-500" />
            <span>Sample data loaded</span>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">What's next?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Explore your dashboard</li>
          <li>• Add more renewals</li>
          <li>• Invite team members</li>
          <li>• Set up notifications</li>
        </ul>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">RenewalPal</span>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              {ONBOARDING_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {ONBOARDING_STEPS[currentStep - 1].title}
              </h1>
              <p className="text-sm text-gray-600">
                {ONBOARDING_STEPS[currentStep - 1].description}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="pb-8">
            {renderStep()}
          </CardContent>
          
          <div className="flex items-center justify-between px-6 pb-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2"
            >
              <span>
                {currentStep === 5 ? "Get Started" : "Continue"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 