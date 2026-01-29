import { useState, useMemo } from "react";
import { getStoredLeads, clearLeads } from "@/data/mockLeads";
import { formatCurrency } from "@/data/solarKits";
import { Lead } from "@/types/lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, RefreshCw, Flame, Snowflake, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export const LeadsDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>(() => getStoredLeads());
  const [filter, setFilter] = useState<"all" | "quente" | "frio">("all");

  const refreshLeads = () => {
    setLeads(getStoredLeads());
    toast.success("Lista de leads atualizada!");
  };

  const resetLeads = () => {
    clearLeads();
    setLeads(getStoredLeads());
    toast.success("Leads resetados para demonstração!");
  };

  const filteredLeads = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((lead) => lead.status === filter);
  }, [leads, filter]);

  const stats = useMemo(() => {
    const quentes = leads.filter((l) => l.status === "quente").length;
    const frios = leads.filter((l) => l.status === "frio").length;
    const totalValor = leads.reduce((acc, l) => acc + l.kitValor, 0);
    return { total: leads.length, quentes, frios, totalValor };
  }, [leads]);

  const exportCSV = () => {
    const headers = ["Nome", "CPF", "CEP", "Consumo", "kWp", "Kit", "Valor", "Status", "Horário"];
    const rows = leads.map((lead) => [
      lead.nome,
      lead.cpf,
      lead.cep,
      lead.consumo.toString(),
      lead.kwp.toString(),
      lead.kitNome,
      lead.kitValor.toString(),
      lead.status,
      lead.horarioAgendamento || "-",
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_zap_solar_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado com sucesso!");
  };

  const sendEmail = () => {
    toast.success("E-mail enviado para a equipe comercial! 📧");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard de Leads</h1>
          <p className="text-muted-foreground">Gerencie seus leads de energia solar</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshLeads}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={resetLeads}>
            Resetar Demo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads Quentes</CardTitle>
            <Flame className="w-4 h-4 text-status-hot" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-hot">{stats.quentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads Frios</CardTitle>
            <Snowflake className="w-4 h-4 text-status-cold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-cold">{stats.frios}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Potencial Total</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(stats.totalValor)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "quente" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("quente")}
          >
            🔥 Quentes
          </Button>
          <Button
            variant={filter === "frio" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("frio")}
          >
            ❄️ Frios
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="outline" onClick={sendEmail}>
            <Mail className="w-4 h-4 mr-2" />
            Enviar por E-mail
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CEP</TableHead>
                <TableHead>Consumo</TableHead>
                <TableHead>Kit Recomendado</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agendamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum lead encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.nome}</TableCell>
                    <TableCell>{lead.cep}</TableCell>
                    <TableCell>{lead.consumo} kWh</TableCell>
                    <TableCell>{lead.kitNome}</TableCell>
                    <TableCell>{formatCurrency(lead.kitValor)}</TableCell>
                    <TableCell>
                      {lead.status === "quente" ? (
                        <Badge className="bg-status-hot hover:bg-status-hot/90 text-status-hot-foreground">
                          🔥 Quente
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-status-cold-light text-status-cold hover:bg-status-cold-light/80">
                          ❄️ Frio
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.horarioAgendamento === "manha"
                        ? "🌅 Manhã"
                        : lead.horarioAgendamento === "tarde"
                        ? "🌇 Tarde"
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
