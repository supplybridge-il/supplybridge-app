---
name: 🛠 Engineering Task
about: Standard development task or refactoring
title: '[TASK] '
labels: documentation, refactor
assignees: ''

---

**Work Description**
Detailed description of the engineering work to be performed.

**Technical Constraints Check**
- [ ] Will all files stay $\le$ 60 lines?
- [ ] Is Zod validation required for new inputs?
- [ ] Are new log events required for the AI pipeline?
- [ ] Is this a Premium-gated feature?

**Affected Layers**
- [ ] `src/models/`
- [ ] `src/services/`
- [ ] `src/components/`
- [ ] `src/app/api/`