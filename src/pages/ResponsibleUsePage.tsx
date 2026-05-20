import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import {
  AlertTriangle, Shield, BookOpen, Heart, GraduationCap, Lock, Ban,
  Share2, DollarSign, Skull, ShieldOff, CheckCircle2, HardDrive, Scale,
  FileText, Bell, Gavel, Lightbulb, HelpCircle, RefreshCw, Mail,
  Clock, FileCheck, Users, Wifi, WifiOff, Accessibility, Brain,
  Briefcase, Languages, Palette, Camera, Archive, Eye, BadgeAlert,
  XCircle, AlertCircle, ChevronRight
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function SectionHeader({ icon: Icon, title, id }: { icon: any; title: string; id?: string }) {
  return (
    <div id={id} className="flex items-center gap-3 mb-6 pt-8 first:pt-0">
      <div className="w-10 h-10 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-tiktok-cyan" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
    </div>
  );
}

function SubSection({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-tiktok-pink" />
        <h3 className="text-base sm:text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, icon }: { items: string[]; icon?: "check" | "x" | "warn" | "arrow" }) {
  const IconComp = icon === "check" ? CheckCircle2 : icon === "x" ? XCircle : icon === "warn" ? AlertCircle : ChevronRight;
  const color = icon === "check" ? "text-green-500" : icon === "x" ? "text-red-500" : icon === "warn" ? "text-yellow-500" : "text-tiktok-cyan";
  return (
    <ul className="space-y-2 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
          <IconComp className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard({ icon: Icon, title, desc, variant = "default" }: { icon: any; title: string; desc: string; variant?: "default" | "green" | "red" }) {
  const bg = variant === "green" ? "bg-green-500/5 border-green-500/20" : variant === "red" ? "bg-red-500/5 border-red-500/20" : "bg-card border-border";
  const iconColor = variant === "green" ? "text-green-500" : variant === "red" ? "text-red-500" : "text-tiktok-cyan";
  return (
    <div className={`p-5 rounded-2xl border ${bg}`}>
      <Icon className={`w-6 h-6 ${iconColor} mb-3`} />
      <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

const ResponsibleUsePage = () => {
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title="Uso Responsável | TikDown TikTok Downloader"
        description="Diretrizes de uso responsável do TikDown: respeite direitos autorais, créditos dos criadores e a política do TikTok ao baixar vídeos."
        canonical="https://baixarvideostiktok.com/uso-responsavel"
      />
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <main className="flex-1 px-4 sm:px-8 py-8">
          {/* Hero */}
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-6 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              POLÍTICA DE USO RESPONSÁVEL
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Termos de Uso e Política de{" "}
              <span className="text-gradient-tiktok">Download Responsável</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm">
              Última atualização: {today}
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="max-w-4xl mx-auto">
            {/* 1. AVISO LEGAL */}
            <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 mb-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">1. Aviso Legal Importante</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Esta ferramenta é fornecida exclusivamente para uso pessoal, privado, educacional e sem fins lucrativos. Ao acessar e utilizar nossos serviços, você declara estar ciente e concordar em cumprir integralmente as leis de direitos autorais vigentes, os termos de serviço das plataformas originais e todas as disposições aqui estabelecidas.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    O descumprimento destas diretrizes pode resultar em responsabilização civil e criminal conforme a legislação brasileira e internacional aplicável.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. FINALIDADE */}
            <SectionHeader icon={BookOpen} title="2. Finalidade Legítima da Ferramenta" id="finalidade" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Nossa plataforma foi desenvolvida para atender a necessidades reais e legítimas de usuários que enfrentam limitações técnicas, geográficas ou pessoais no acesso a conteúdo online.
            </p>

            <SubSection icon={WifiOff} title="2.1. Acessibilidade e Conectividade Limitada">
              <p className="text-sm text-muted-foreground mb-3">Muitas pessoas dependem do download de vídeos para:</p>
              <BulletList icon="arrow" items={[
                "Áreas com infraestrutura precária: Usuários que residem em regiões com internet instável, lenta ou intermitente, onde o streaming não é viável",
                "Economia de dados móveis: Pessoas que utilizam planos de dados limitados (3G/4G/5G) e precisam otimizar o consumo para evitar gastos excessivos",
                "Profissionais em trânsito: Trabalhadores que viajam frequentemente e permanecem longos períodos sem conexão adequada",
                "Estudantes de zonas rurais: Alunos que necessitam de material educacional offline para acompanhar conteúdos escolares e universitários",
                "Navegação em transporte público: Pessoas que utilizam metrôs, ônibus ou aviões onde a conexão é indisponível ou de baixa qualidade",
              ]} />
            </SubSection>

            <SubSection icon={Heart} title="2.2. Necessidades Especiais e Terapêuticas">
              <p className="text-sm text-muted-foreground mb-3">Reconhecemos o valor terapêutico e educacional de vídeos para:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                <InfoCard icon={Accessibility} title="Necessidades Especiais" desc="Famílias que utilizam vídeos educativos, lúdicos e terapêuticos como parte do desenvolvimento e tratamento." />
                <InfoCard icon={Brain} title="Terapias e Reabilitação" desc="Pacientes em processos terapêuticos que necessitam de conteúdo específico para exercícios, relaxamento ou estimulação cognitiva." />
                <InfoCard icon={Wifi} title="Acesso Offline em Consultórios" desc="Profissionais da saúde que trabalham em locais com conectividade limitada e precisam de material de apoio." />
                <InfoCard icon={Users} title="Inclusão Digital" desc="Pessoas com dificuldades de aprendizado que necessitam revisar conteúdos múltiplas vezes sem depender de conexão constante." />
              </div>
            </SubSection>

            <SubSection icon={GraduationCap} title="2.3. Educação e Desenvolvimento Pessoal">
              <p className="text-sm text-muted-foreground mb-3">O download de vídeos é essencial para:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InfoCard icon={BookOpen} title="Estudo e Pesquisa" desc="Material para revisão, trabalhos acadêmicos e preparação para provas sem consumir dados." />
                <InfoCard icon={Briefcase} title="Capacitação Profissional" desc="Aperfeiçoamento através de tutoriais, cursos e treinamentos offline." />
                <InfoCard icon={Languages} title="Aprendizado de Idiomas" desc="Conteúdo para prática repetitiva de línguas estrangeiras." />
                <InfoCard icon={Palette} title="Hobbies e Habilidades" desc="Tutoriais de culinária, artesanato, música e outras técnicas." />
                <InfoCard icon={GraduationCap} title="Preparação de Aulas" desc="Educadores que preparam material didático em locais sem internet." />
              </div>
            </SubSection>

            <SubSection icon={Archive} title="2.4. Preservação de Memórias e Conteúdo Pessoal">
              <BulletList icon="check" items={[
                "Backup de momentos especiais: Preservar vídeos de família, casamentos, aniversários, formaturas e outras ocasiões importantes",
                "Conteúdo próprio: Criadores que desejam fazer cópia de segurança de seus próprios vídeos publicados",
                "Documentação histórica: Guardar registros importantes que podem ser removidos das plataformas originais",
                "Arquivo pessoal: Manter em dispositivo próprio conteúdos que têm valor sentimental ou histórico pessoal",
              ]} />
            </SubSection>

            <SubSection icon={Eye} title="2.5. Privacidade e Segurança">
              <BulletList icon="check" items={[
                "Proteção de dados pessoais: Evitar rastreamento excessivo de hábitos de visualização",
                "Controle de privacidade: Assistir conteúdos sensíveis sem deixar histórico em plataformas online",
                "Segurança da informação: Profissionais que lidam com informações confidenciais e preferem conteúdo offline",
                "Evitar algoritmos: Usuários que não desejam ter seus interesses mapeados por sistemas de recomendação",
              ]} />
            </SubSection>

            {/* 3. PROIBIDO */}
            <SectionHeader icon={Ban} title="3. O Que É Estritamente Proibido" id="proibido" />

            <SubSection icon={BadgeAlert} title="3.1. Violação de Direitos Autorais">
              <p className="text-sm font-semibold text-red-400 mb-3">É EXPRESSAMENTE VEDADO:</p>
              <BulletList icon="x" items={[
                "Baixar músicas, filmes, séries, documentários ou qualquer conteúdo protegido por direitos autorais sem autorização expressa dos titulares",
                "Utilizar a ferramenta para contornar sistemas de proteção contra cópia (DRM)",
                "Acessar conteúdo pago ou restrito sem a devida licença ou assinatura",
                "Violar marcas registradas, direitos de imagem, voz ou propriedade intelectual de terceiros",
              ]} />
            </SubSection>

            <SubSection icon={Share2} title="3.2. Redistribuição e Compartilhamento">
              <p className="text-sm font-semibold text-red-400 mb-3">NÃO PERMITIMOS:</p>
              <BulletList icon="x" items={[
                "Republicar vídeos baixados em outras plataformas (YouTube, TikTok, Instagram, Facebook, Kwai, Vimeo, etc.)",
                "Compartilhar arquivos em redes sociais, grupos de mensagens (WhatsApp, Telegram), fóruns ou sites",
                "Fazer upload em servidores de armazenamento (Google Drive, Dropbox, Mega, etc.) para distribuição",
                "Incorporar vídeos baixados em sites, blogs ou aplicações sem autorização",
                "Transmitir ou exibir publicamente o conteúdo baixado (em eventos, estabelecimentos comerciais, etc.)",
              ]} />
            </SubSection>

            <SubSection icon={DollarSign} title="3.3. Uso Comercial e Lucrativo">
              <p className="text-sm font-semibold text-red-400 mb-3">É PROIBIDO:</p>
              <BulletList icon="x" items={[
                "Utilizar vídeos baixados para fins comerciais, publicitários ou promocionais",
                "Lucrar direta ou indiretamente com conteúdo de terceiros",
                "Incluir vídeos em produtos vendidos ou distribuídos (DVDs, cursos pagos, etc.)",
                "Usar em campanhas de marketing, anúncios ou material corporativo sem licença",
                "Monetizar conteúdo em plataformas que geram receita (AdSense, afiliados, etc.)",
              ]} />
            </SubSection>

            <SubSection icon={Skull} title="3.4. Usos Ilícitos e Danosos">
              <p className="text-sm font-semibold text-red-400 mb-3">NÃO TOLERAMOS:</p>
              <BulletList icon="x" items={[
                "Utilizar vídeos para assédio, perseguição, difamação, calúnia ou injúria",
                "Violar privacidade, intimidade ou honra de terceiros",
                "Criar deepfakes, manipulações ou edições enganosas que distorçam o conteúdo original",
                "Praticar discurso de ódio, discriminação ou apologia à violência",
                "Realizar qualquer atividade ilegal, fraudulenta ou que viole direitos fundamentais",
              ]} />
            </SubSection>

            <SubSection icon={ShieldOff} title="3.5. Contorno de Medidas de Proteção">
              <p className="text-sm font-semibold text-red-400 mb-3">É VEDADO:</p>
              <BulletList icon="x" items={[
                "Burlar restrições de privacidade (baixar vídeos privados sem autorização)",
                "Acessar contas de terceiros para realizar downloads",
                "Utilizar métodos automatizados em massa (bots, scrapers) que sobrecarreguem as plataformas",
                "Violar medidas tecnológicas de proteção implementadas pelas plataformas originais",
              ]} />
            </SubSection>

            {/* 4. RESPONSABILIDADES */}
            <SectionHeader icon={CheckCircle2} title="4. Suas Responsabilidades e Obrigações" id="responsabilidades" />

            <SubSection icon={FileCheck} title="4.1. Verificação Prévia">
              <BulletList icon="check" items={[
                "Confirmar se possui direito legal de baixar o conteúdo (se é autor, se tem autorização ou se está em domínio público)",
                "Verificar se o vídeo possui restrições de uso ou licenciamento específico",
                "Assegurar-se de que o download não viola termos de serviço da plataforma de origem",
                "Confirmar que o uso pretendido está em conformidade com a legislação aplicável",
              ]} />
            </SubSection>

            <SubSection icon={CheckCircle2} title="4.2. Uso Adequado">
              <BulletList icon="check" items={[
                "Utilizar os vídeos baixados exclusivamente para fins pessoais e privados",
                "Manter o conteúdo em dispositivos de acesso restrito e seguro",
                "Não remover marcas d'água, créditos ou informações de autoria dos vídeos",
                "Respeitar a integridade do conteúdo original sem distorções prejudiciais",
                "Apoiar os criadores originais através de interações positivas (likes, inscrições, compartilhamentos oficiais)",
              ]} />
            </SubSection>

            <SubSection icon={HardDrive} title="4.3. Armazenamento Seguro">
              <BulletList icon="check" items={[
                "Guardar os arquivos em local seguro e de acesso controlado",
                "Não compartilhar senhas ou acesso aos dispositivos onde os vídeos estão armazenados",
                "Excluir conteúdos quando solicitado pelos titulares dos direitos",
                "Manter registro de autorizações quando aplicável",
              ]} />
            </SubSection>

            <SubSection icon={Scale} title="4.4. Conformidade Legal">
              <BulletList icon="check" items={[
                "Cumprir a Lei de Direitos Autorais (Lei 9.610/98)",
                "Observar o Marco Civil da Internet (Lei 12.965/14)",
                "Respeitar a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/18)",
                "Atender à legislação penal e civil aplicável",
                "Seguir os termos de uso das plataformas originais (YouTube, TikTok, Instagram, Facebook, Kwai)",
              ]} />
            </SubSection>

            {/* 5. ISENÇÃO */}
            <SectionHeader icon={Shield} title="5. Isenção de Responsabilidade da Plataforma" id="isencao" />

            <SubSection icon={Shield} title="5.1. Natureza da Ferramenta">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nossa plataforma funciona como um meio técnico neutro — similar a um navegador web, player de vídeo ou ferramenta de busca. Não criamos, hospedamos, distribuímos ou controlamos o conteúdo original das plataformas de terceiros.
              </p>
            </SubSection>

            <SubSection icon={Shield} title="5.2. Limitação de Responsabilidade">
              <p className="text-sm font-semibold text-foreground mb-3">NÃO SOMOS RESPONSÁVEIS POR:</p>
              <BulletList icon="warn" items={[
                "Como você utiliza os vídeos após o download",
                "Violações de direitos autorais cometidas pelos usuários",
                "Consequências legais, civis ou criminais do uso inadequado",
                "Conteúdo original das plataformas de origem (YouTube, TikTok, Instagram, Facebook, Kwai)",
                "Precisão, qualidade, legalidade ou adequação do conteúdo baixado",
                "Danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso",
                "Perda de dados, vírus ou malware que possam estar presentes nos arquivos originais",
              ]} />
            </SubSection>

            <SubSection icon={Shield} title="5.3. Ausência de Endosso">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">A disponibilidade desta ferramenta não constitui:</p>
              <BulletList icon="warn" items={[
                "Endosso ou aprovação do conteúdo das plataformas originais",
                "Autorização para violar direitos de terceiros",
                "Permissão para uso comercial ou redistribuição",
                "Garantia de legalidade do download em todas as jurisdições",
              ]} />
            </SubSection>

            <SubSection icon={Shield} title="5.4. Variações Jurídicas">
              <p className="text-sm text-muted-foreground leading-relaxed">
                As leis de direitos autorais variam significativamente entre países. É sua responsabilidade verificar a legalidade do download em sua jurisdição específica, consultar um advogado especializado em caso de dúvidas e cumprir a legislação local aplicável ao seu caso.
              </p>
            </SubSection>

            {/* 6. DIREITOS AUTORAIS */}
            <SectionHeader icon={FileText} title="6. Direitos Autorais e Exceções Legais" id="direitos" />

            <SubSection icon={Lock} title="6.1. O Que É Protegido por Direitos Autorais">
              <p className="text-sm text-muted-foreground mb-3">Conforme a Lei 9.610/98, estão protegidos:</p>
              <BulletList icon="arrow" items={[
                "Obras audiovisuais (filmes, vídeos, documentários)",
                "Composições musicais e gravações sonoras",
                "Obras fotográficas e imagens",
                "Textos, roteiros e narrativas",
                "Coreografias e obras cênicas",
                "Programas de computador e softwares",
                "Qualquer criação expressa por qualquer meio",
              ]} />
            </SubSection>

            <SubSection icon={Scale} title="6.2. Exceções e Limitações (Uso Justo/Fair Use)">
              <p className="text-sm text-muted-foreground mb-3">A legislação brasileira prevê algumas exceções limitadas:</p>
              <BulletList icon="check" items={[
                "Citação para estudo, crítica ou polêmica (com indicação do autor e origem)",
                "Uso em estabelecimentos de ensino para fins didáticos",
                "Reprodução de pequenos trechos para uso privado do copista",
                "Acesso para deficientes visuais ou auditivos",
                "Cópia de segurança de programas de computador",
              ]} />
              <div className="mt-4 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                <p className="text-xs text-yellow-500 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  IMPORTANTE: Estas exceções são restritas e específicas. Não constituem autorização geral para download indiscriminado.
                </p>
              </div>
            </SubSection>

            <SubSection icon={CheckCircle2} title="6.3. Domínio Público e Licenças Livres">
              <p className="text-sm text-muted-foreground mb-3">Você PODE baixar quando:</p>
              <BulletList icon="check" items={[
                "O conteúdo estiver em domínio público (geralmente 70 anos após morte do autor)",
                "Possuir licença Creative Commons que permita download e uso",
                "O autor tiver autorizado explicitamente o download e redistribuição",
                "For conteúdo de sua própria autoria",
              ]} />
            </SubSection>

            {/* 7. DMCA */}
            <SectionHeader icon={Bell} title="7. Política de Notificação e Remoção (DMCA)" id="dmca" />

            <SubSection icon={Bell} title="7.1. Respeito aos Direitos dos Criadores">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Respeitamos integralmente os direitos dos titulares de propriedade intelectual e agimos prontamente mediante notificação válida de violação.
              </p>
            </SubSection>

            <SubSection icon={Mail} title="7.2. Como Enviar uma Notificação">
              <p className="text-sm text-muted-foreground mb-3">Se você é detentor de direitos autorais e acredita que nosso serviço está sendo utilizado para violar seus direitos, envie uma notificação contendo:</p>
              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <p className="text-sm text-muted-foreground">📧 <strong className="text-foreground">Destinatário:</strong> contato@baixarvideostiktok.com</p>
                <p className="text-sm text-muted-foreground">📝 <strong className="text-foreground">Identificação da obra:</strong> Descrição detalhada do conteúdo original</p>
                <p className="text-sm text-muted-foreground">🔗 <strong className="text-foreground">URL infringente:</strong> Link específico que viola seus direitos</p>
                <p className="text-sm text-muted-foreground">📄 <strong className="text-foreground">Prova de titularidade:</strong> Documentação que comprove sua propriedade</p>
                <p className="text-sm text-muted-foreground">✍️ <strong className="text-foreground">Declaração de boa-fé:</strong> Afirmação de que o uso não foi autorizado</p>
                <p className="text-sm text-muted-foreground">📞 <strong className="text-foreground">Informações de contato:</strong> Nome, endereço, telefone e e-mail</p>
                <p className="text-sm text-muted-foreground">🖊️ <strong className="text-foreground">Assinatura:</strong> Física ou eletrônica do titular ou representante legal</p>
              </div>
            </SubSection>

            <SubSection icon={Clock} title="7.3. Prazos e Procedimentos">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard icon={Clock} title="Análise Inicial" desc="Até 48 horas úteis após recebimento." />
                <InfoCard icon={CheckCircle2} title="Ação de Remoção" desc="Imediata após confirmação da violação." />
                <InfoCard icon={Bell} title="Notificação ao Usuário" desc="Quando aplicável e possível." />
                <InfoCard icon={FileText} title="Contranotificação" desc="Usuários podem apresentar defesa em até 10 dias úteis." />
              </div>
            </SubSection>

            <SubSection icon={AlertTriangle} title="7.4. Notificações Falsas">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Notificações falsas ou de má-fé podem resultar em responsabilização civil por danos materiais e morais, ações judiciais por abuso de direito e indenização por perdas e danos causados.
              </p>
            </SubSection>

            {/* 8. SANÇÕES */}
            <SectionHeader icon={Gavel} title="8. Sanções e Consequências do Descumprimento" id="sancoes" />

            <SubSection icon={AlertTriangle} title="8.1. Medidas da Plataforma">
              <p className="text-sm text-muted-foreground mb-3">Reservamo-nos o direito de:</p>
              <BulletList icon="warn" items={[
                "Suspender ou encerrar contas de usuários reincidentes",
                "Bloquear acesso a endereços IP que violem reiteradamente os termos",
                "Remover links ou funcionalidades mediante notificação válida",
                "Cooperar com autoridades mediante ordem judicial",
                "Manter registros de atividade para fins de conformidade legal",
              ]} />
            </SubSection>

            <SubSection icon={Scale} title="8.2. Consequências Legais">
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h4 className="font-semibold text-foreground text-sm mb-2">⚖️ Responsabilidade Civil</h4>
                  <BulletList icon="warn" items={[
                    "Indenização por danos materiais (lucros cessantes, danos emergentes)",
                    "Compensação por danos morais",
                    "Perda de equipamentos utilizados na violação",
                  ]} />
                </div>
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h4 className="font-semibold text-foreground text-sm mb-2">⚖️ Responsabilidade Criminal (Art. 184 do Código Penal)</h4>
                  <BulletList icon="warn" items={[
                    "Detenção de 3 meses a 1 ano (violação simples)",
                    "Reclusão de 2 a 4 anos (violação com fins lucrativos)",
                    "Multa proporcional ao dano causado",
                  ]} />
                </div>
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h4 className="font-semibold text-foreground text-sm mb-2">⚖️ Responsabilidade Administrativa</h4>
                  <BulletList icon="warn" items={[
                    "Multas aplicadas por órgãos de fiscalização",
                    "Bloqueio de sites e aplicações",
                    "Inclusão em cadastros restritivos",
                  ]} />
                </div>
              </div>
            </SubSection>

            {/* 9. BOAS PRÁTICAS */}
            <SectionHeader icon={Lightbulb} title="9. Recomendações de Boas Práticas" id="boas-praticas" />

            <SubSection icon={CheckCircle2} title="9.1. Antes de Baixar">
              <BulletList icon="check" items={[
                'Pergunte-se: "Eu tenho direito legal de baixar este conteúdo?"',
                "Verifique: O vídeo é de minha autoria? Tenho autorização por escrito?",
                "Considere: O criador oferece download oficial? Há opção de compra?",
                "Avalie: Meu uso se enquadra em exceções legais específicas?",
              ]} />
            </SubSection>

            <SubSection icon={CheckCircle2} title="9.2. Após o Download">
              <BulletList icon="check" items={[
                "Armazene com segurança: Em dispositivo pessoal e protegido",
                "Não compartilhe: Mantenha o arquivo em uso estritamente pessoal",
                "Dê créditos: Quando for pertinente e autorizado",
                "Apoie o criador: Curta, inscreva-se, compartilhe oficialmente",
                "Exclua quando necessário: Se receber notificação ou perder autorização",
              ]} />
            </SubSection>

            <SubSection icon={Lightbulb} title="9.3. Alternativas Legais">
              <p className="text-sm text-muted-foreground mb-3">Considere estas opções antes de baixar:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard icon={Camera} title="Assinaturas Oficiais" desc="YouTube Premium, Netflix, Spotify e outros serviços oferecem download legal." variant="green" />
                <InfoCard icon={CheckCircle2} title="Download Oficial" desc="Muitas plataformas oferecem download dentro do próprio aplicativo." variant="green" />
                <InfoCard icon={BookOpen} title="Conteúdo Gratuito Legal" desc="Creative Commons, domínio público e conteúdos com autorização expressa." variant="green" />
                <InfoCard icon={Mail} title="Contato com Criadores" desc="Solicite autorização por e-mail ou redes sociais diretamente ao criador." variant="green" />
              </div>
            </SubSection>

            {/* 10. FAQ */}
            <SectionHeader icon={HelpCircle} title="10. Perguntas Frequentes (FAQ)" id="faq" />

            <div className="space-y-4 mb-8">
              {[
                { q: "Posso baixar vídeos para assistir offline?", a: "Sim, desde que seja para uso estritamente pessoal, você tenha direito legal sobre o conteúdo ou esteja amparado por exceções legais específicas." },
                { q: "É permitido baixar meus próprios vídeos?", a: "Sim, você pode baixar vídeos de sua própria autoria para backup e uso pessoal." },
                { q: "Posso usar vídeos baixados em trabalhos escolares?", a: "A legislação permite citação para fins didáticos, mas com limitações. Consulte seu educador sobre as regras específicas da instituição." },
                { q: "É crime baixar vídeos do TikTok?", a: "Depende do uso. Para visualização pessoal de conteúdo público, geralmente não há crime. Porém, redistribuir, lucrar ou violar direitos autorais é ilegal." },
                { q: "O que acontece se eu republicar um vídeo baixado?", a: "Você pode receber notificação de remoção, ter sua conta suspensa na plataforma, e ser responsabilizado civil e criminalmente por violação de direitos autorais." },
                { q: "Como sei se um vídeo está protegido por direitos autorais?", a: "Praticamente todo conteúdo criativo está automaticamente protegido. A ausência de símbolo © não significa que é livre. Na dúvida, presuma que está protegido." },
                { q: "Posso baixar se o vídeo não tem marca d'água?", a: "A ausência de marca d'água não indica ausência de direitos autorais. A proteção é automática pela criação da obra." },
                { q: "E se o criador não se manifestar contra?", a: "A tolerância não significa autorização. O titular pode exercer seus direitos a qualquer momento, mesmo que tenha permitido anteriormente." },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-border bg-card">
                  <h4 className="font-semibold text-foreground text-sm mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-tiktok-cyan shrink-0 mt-0.5" />
                    {item.q}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-6">{item.a}</p>
                </div>
              ))}
            </div>

            {/* 11. ATUALIZAÇÕES */}
            <SectionHeader icon={RefreshCw} title="11. Atualizações e Modificações" id="atualizacoes" />
            <div className="space-y-3 mb-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento, sem aviso prévio, para adequação a mudanças legais, tecnológicas ou operacionais.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Versões atualizadas serão publicadas nesta página com data de vigência. O uso continuado da ferramenta após alterações constitui aceitação dos novos termos.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recomendamos que você revise periodicamente esta página para se manter informado sobre suas responsabilidades e direitos.
              </p>
            </div>

            {/* 12. CONTATO */}
            <SectionHeader icon={Mail} title="12. Contato e Suporte" id="contato" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-2xl border border-border bg-card text-center">
                <Mail className="w-6 h-6 text-tiktok-cyan mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Dúvidas Gerais</h4>
                <p className="text-xs text-muted-foreground mt-1">contato@baixarvideostiktok.com</p>
                <p className="text-xs text-muted-foreground mt-1">Resposta em até 5 dias úteis</p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-card text-center">
                <Shield className="w-6 h-6 text-tiktok-pink mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Notificações DMCA</h4>
                <p className="text-xs text-muted-foreground mt-1">dmca@baixarvideostiktok.com</p>
                <p className="text-xs text-muted-foreground mt-1">Resposta em até 48 horas úteis</p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-card text-center">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Urgências Legais</h4>
                <p className="text-xs text-muted-foreground mt-1">legal@baixarvideostiktok.com</p>
                <p className="text-xs text-muted-foreground mt-1">Resposta imediata</p>
              </div>
            </div>

            {/* 13. DISPOSIÇÕES FINAIS */}
            <SectionHeader icon={FileText} title="13. Disposições Finais" id="disposicoes" />

            <div className="space-y-3 mb-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">13.1. Legislação Aplicável:</strong> Estes termos são regidos pelas leis da República Federativa do Brasil, especialmente a Lei de Direitos Autorais (Lei 9.610/98), Marco Civil da Internet (Lei 12.965/14), Código Civil (Lei 10.406/02) e Código Penal (Decreto-Lei 2.848/40).
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">13.2. Foro Competente:</strong> Para dirimir quaisquer controvérsias decorrentes destes termos, fica eleito o foro da comarca do domicílio do réu, conforme a legislação aplicável.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">13.3. Divisibilidade:</strong> Se qualquer disposição destes termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">13.4. Renúncia:</strong> A falta de exigência do cumprimento de qualquer disposição não constitui renúncia a tal direito.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">13.5. Integralidade:</strong> Estes termos constituem o acordo completo entre você e nossa plataforma em relação ao uso da ferramenta de download, substituindo todos os acordos anteriores.
              </p>
            </div>

            {/* 14. ACEITE */}
            <SectionHeader icon={FileCheck} title="14. Aceite dos Termos" id="aceite" />

            <div className="p-6 rounded-2xl border border-tiktok-cyan/20 bg-tiktok-cyan/5 mb-8">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Ao clicar no botão "BAIXAR" ou utilizar qualquer funcionalidade desta plataforma, você declara que:
              </p>
              <BulletList icon="check" items={[
                "Leu e compreendeu integralmente estes termos",
                "Concorda em cumprir todas as disposições aqui estabelecidas",
                "Assume total responsabilidade pelo uso da ferramenta",
                "Está ciente das consequências do descumprimento",
                "Possui capacidade legal para celebrar este acordo",
              ]} />
              <div className="mt-4 pt-4 border-t border-tiktok-cyan/10 space-y-2">
                <p className="text-xs text-muted-foreground"><strong className="text-foreground">Menores de Idade:</strong> Menores de 18 anos devem obter consentimento dos pais ou responsáveis legais antes de utilizar esta ferramenta.</p>
                <p className="text-xs text-muted-foreground"><strong className="text-foreground">Uso Profissional:</strong> Profissionais (advogados, educadores, empresas) devem consultar assessoria jurídica especializada antes de utilizar a ferramenta em contextos institucionais.</p>
              </div>
            </div>

            {/* RESUMO PRÁTICO */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-foreground text-center mb-6">📋 Resumo Prático</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                  <h3 className="font-bold text-green-500 text-sm mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> PODE BAIXAR QUANDO
                  </h3>
                  <BulletList icon="check" items={[
                    "É seu próprio conteúdo",
                    "Tem autorização por escrito do titular",
                    "Está em domínio público",
                    "Possui licença Creative Commons adequada",
                    "É para uso estritamente pessoal e privado",
                    "Se enquadra em exceções legais específicas",
                  ]} />
                </div>
                <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                  <h3 className="font-bold text-red-500 text-sm mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> NÃO PODE BAIXAR QUANDO
                  </h3>
                  <BulletList icon="x" items={[
                    "É conteúdo protegido sem autorização",
                    "Pretende redistribuir ou compartilhar",
                    "Vai usar para fins comerciais",
                    "É conteúdo privado de terceiros",
                    "Viola termos da plataforma original",
                    "É para exibição pública",
                  ]} />
                </div>
                <div className="p-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
                  <h3 className="font-bold text-yellow-500 text-sm mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> NA DÚVIDA
                  </h3>
                  <BulletList icon="warn" items={[
                    "Não baixe",
                    "Consulte um advogado",
                    "Entre em contato conosco",
                    "Busque alternativas legais",
                  ]} />
                </div>
              </div>
            </div>

            {/* Final message */}
            <div className="text-center p-8 rounded-2xl border border-border bg-card mb-8">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                <strong className="text-foreground">LEMBRE-SE:</strong> Esta ferramenta é um recurso técnico para facilitar o acesso offline a conteúdos que você tem direito legal de acessar. O respeito aos direitos autorais e aos criadores de conteúdo é fundamental para um ecossistema digital justo e sustentável.
              </p>
              <p className="text-sm text-tiktok-cyan font-semibold mt-4">
                Apoie os criadores que você admira através de meios oficiais. O trabalho deles merece ser valorizado e remunerado adequadamente. ❤️
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ResponsibleUsePage;
