import { exportRegistrationsCsv, getAdminStats, getRegistrations, logoutAdmin } from '@/modules/credits/actions/admin';
import { Button } from '@/components/ui';

type AdminDashboardProps = {
	copy: {
		title: string;
		total: string;
		hasCursor: string;
		willRegister: string;
		export: string;
		logout: string;
		empty: string;
		tableEmail: string;
		tableChapter: string;
		tableStatus: string;
		tableRegistered: string;
	};
};

export default async function AdminDashboard({ copy }: AdminDashboardProps) {
	const [stats, registrations] = await Promise.all([getAdminStats(), getRegistrations()]);
	const csv = await exportRegistrationsCsv();

	return (
		<div className="space-y-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h1 className="text-2xl font-normal text-cursor-text">{copy.title}</h1>
				<form action={logoutAdmin}>
					<Button type="submit" variant="secondary" size="sm">
						{copy.logout}
					</Button>
				</form>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				<StatCard label={copy.total} value={stats.total} />
				<StatCard label={copy.hasCursor} value={stats.hasCursor} />
				<StatCard label={copy.willRegister} value={stats.willRegister} />
			</div>

			<div>
				<a
					href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
					download="cursor-credit-registrations.csv"
					className="inline-flex"
				>
					<Button variant="primary" size="md">
						{copy.export}
					</Button>
				</a>
			</div>

			{registrations.length === 0 ? (
				<p className="text-sm text-cursor-text-muted">{copy.empty}</p>
			) : (
				<div className="overflow-x-auto rounded-md border border-cursor-border">
					<table className="min-w-full text-left text-sm">
						<thead className="border-b border-cursor-border bg-cursor-surface">
							<tr>
								<th className="px-4 py-3 font-normal text-cursor-text-muted">{copy.tableEmail}</th>
								<th className="px-4 py-3 font-normal text-cursor-text-muted">{copy.tableChapter}</th>
								<th className="px-4 py-3 font-normal text-cursor-text-muted">{copy.tableStatus}</th>
								<th className="px-4 py-3 font-normal text-cursor-text-muted">{copy.tableRegistered}</th>
							</tr>
						</thead>
						<tbody>
							{registrations.map((row) => (
								<tr key={row.email} className="border-b border-cursor-border last:border-b-0">
									<td className="px-4 py-3 text-cursor-text">{row.email}</td>
									<td className="px-4 py-3 text-cursor-text-secondary">{row.chapter}</td>
									<td className="px-4 py-3 text-cursor-text-secondary">{row.accountStatus}</td>
									<td className="px-4 py-3 text-cursor-text-secondary">
										{new Date(row.createdAt).toLocaleString('en-NZ')}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-md border border-cursor-border bg-cursor-surface p-4">
			<p className="text-sm text-cursor-text-muted">{label}</p>
			<p className="mt-1 text-2xl tabular-nums text-cursor-text">{value}</p>
		</div>
	);
}
