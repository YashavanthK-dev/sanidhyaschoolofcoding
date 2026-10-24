<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public pages read published content via server functions in src/lib/content.functions.ts (publishable client + RLS); /admin screens write through the browser client, and RLS has_role(admin) is the security boundary. The first account ever created becomes admin via a DB trigger.
