// src/app/admin/page.tsx
export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Projekty</h2>
                    <p className="text-3xl font-bold mt-2">4</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Zkušenosti</h2>
                    <p className="text-3xl font-bold mt-2">6</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Dovednosti</h2>
                    <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Certifikáty</h2>
                    <p className="text-3xl font-bold mt-2">8</p>
                </div>
            </div>
        </div>
    )
}