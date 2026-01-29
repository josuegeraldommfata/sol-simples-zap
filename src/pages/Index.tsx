import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { LeadsDashboard } from "@/components/dashboard/LeadsDashboard";
import { MessageCircle, LayoutDashboard, Sun } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Zap Solar ☀️</h1>
            <p className="text-sm opacity-80">Sistema de Qualificação de Leads</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <div className="max-w-md mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border h-[600px]">
                <ChatContainer />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="mt-0">
            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              <LeadsDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>MVP de Demonstração • Dados Mockados • Pronto para White Label</p>
      </footer>
    </div>
  );
};

export default Index;
