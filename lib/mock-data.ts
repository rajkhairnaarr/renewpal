type MockRenewal = {
  id: string
  name: string
  category: string
  status: string
  renewal_date: string
  amount: number
  owner: {
    id: string
    full_name: string
    avatar_url: string
  }
  organization_id: string
  created_at: string
}

export const mockRenewals: MockRenewal[] = [
  {
    id: "1",
    name: "Adobe Creative Cloud",
    category: "Software",
    status: "Active",
    renewal_date: "2024-12-15T00:00:00Z",
    amount: 599.88,
    owner: {
      id: "user_1",
      full_name: "Alice Johnson",
      avatar_url: "/avatars/alice.png",
    },
    organization_id: "org_1",
    created_at: "2023-12-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Microsoft 365",
    category: "Software",
    status: "Due Soon",
    renewal_date: "2024-04-30T00:00:00Z",
    amount: 1250.0,
    owner: {
      id: "user_2",
      full_name: "Bob Williams",
      avatar_url: "/avatars/bob.png",
    },
    organization_id: "org_1",
    created_at: "2023-04-30T00:00:00Z",
  },
  {
    id: "3",
    name: "Office Lease",
    category: "Contract",
    status: "Overdue",
    renewal_date: "2024-03-01T00:00:00Z",
    amount: 50000.0,
    owner: {
      id: "user_1",
      full_name: "Alice Johnson",
      avatar_url: "/avatars/alice.png",
    },
    organization_id: "org_1",
    created_at: "2023-03-01T00:00:00Z",
  },
  {
    id: "4",
    name: "AWS Hosting",
    category: "Subscription",
    status: "Completed",
    renewal_date: "2024-02-20T00:00:00Z",
    amount: 2500.0,
    owner: {
      id: "user_3",
      full_name: "Charlie Brown",
      avatar_url: "/avatars/charlie.png",
    },
    organization_id: "org_1",
    created_at: "2023-02-20T00:00:00Z",
  },
]