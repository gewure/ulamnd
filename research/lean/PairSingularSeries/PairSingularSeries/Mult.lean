import PairSingularSeries.CRT

/-!
# The root Ramanujan sum is multiplicative (paper I, Section 3.1)

`c^f_q(h) = ∑_{d ∣ q} d μ(q/d) ν_f(d,h) ω_f(q/d)²` is the Dirichlet convolution of the two
multiplicative functions `d ↦ d ν_f(d,h)` and `m ↦ μ(m) ω_f(m)²`, hence multiplicative
(`cf_mul`), with `c^f_1 = 1` and `c^f_p(h) = p ν_f(p,h) - ω_f(p)²` at primes (`cf_prime`).
Also: `b(q) = ∏_{p ∣ q}(p - ω_f(p))^{-2}` is multiplicative (`bfun_mul`).
-/

namespace PairSingularSeries

open Finset Polynomial ArithmeticFunction

/-- `d ↦ d ν_f(d, h)` as an arithmetic function. -/
def nuAF (f : ℤ[X]) (h : ℤ) : ArithmeticFunction ℤ :=
  ⟨fun d => (d : ℤ) * nu f d h, by simp⟩

/-- `m ↦ μ(m) ω_f(m)²` as an arithmetic function. -/
def rhoAF (f : ℤ[X]) : ArithmeticFunction ℤ :=
  ⟨fun m => moebius m * (omega f m : ℤ) ^ 2, by simp⟩

@[simp] theorem nuAF_apply (f : ℤ[X]) (h : ℤ) (d : ℕ) : nuAF f h d = (d : ℤ) * nu f d h := rfl
@[simp] theorem rhoAF_apply (f : ℤ[X]) (m : ℕ) : rhoAF f m = moebius m * (omega f m : ℤ) ^ 2 := rfl

theorem nuAF_isMultiplicative (f : ℤ[X]) (h : ℤ) : (nuAF f h).IsMultiplicative := by
  refine ⟨by simp [nu_one], ?_⟩
  intro m n hmn
  simp only [nuAF_apply]
  rcases Nat.eq_zero_or_pos m with rfl | hm
  · simp
  rcases Nat.eq_zero_or_pos n with rfl | hn
  · simp
  rw [nu_mul f h hm hn hmn]
  push_cast
  ring

theorem rhoAF_isMultiplicative (f : ℤ[X]) : (rhoAF f).IsMultiplicative := by
  refine ⟨by simp [omega_one], ?_⟩
  intro m n hmn
  simp only [rhoAF_apply]
  rcases Nat.eq_zero_or_pos m with rfl | hm
  · simp
  rcases Nat.eq_zero_or_pos n with rfl | hn
  · simp
  rw [omega_mul f hm hn hmn, isMultiplicative_moebius.map_mul_of_coprime hmn]
  push_cast
  ring

/-- `c^f_q(h)` is the Dirichlet convolution `(d ↦ d ν_f(d,h)) * (m ↦ μ(m) ω_f(m)²)` at `q`. -/
theorem cf_eq_mul (f : ℤ[X]) (q : ℕ) (h : ℤ) : cf f q h = (nuAF f h * rhoAF f) q := by
  rw [mul_apply, Nat.sum_divisorsAntidiagonal (fun a b => nuAF f h a * rhoAF f b)]
  unfold cf
  refine Finset.sum_congr rfl fun d _ => ?_
  simp only [nuAF_apply, rhoAF_apply]
  ring

/-- **`c^f` is multiplicative in `q`.** -/
theorem cf_mul (f : ℤ[X]) (h : ℤ) {m n : ℕ} (hmn : m.Coprime n) :
    cf f (m * n) h = cf f m h * cf f n h := by
  rw [cf_eq_mul, cf_eq_mul, cf_eq_mul]
  exact ((nuAF_isMultiplicative f h).mul (rhoAF_isMultiplicative f)).map_mul_of_coprime hmn

/-- `c^f_1(h) = 1`. -/
theorem cf_one (f : ℤ[X]) (h : ℤ) : cf f 1 h = 1 := by
  rw [cf_eq_mul]
  exact ((nuAF_isMultiplicative f h).mul (rhoAF_isMultiplicative f)).map_one

/-- `c^f_0(h) = 0`. -/
theorem cf_zero (f : ℤ[X]) (h : ℤ) : cf f 0 h = 0 := by
  unfold cf
  simp

/-- **`c^f_p(h) = p ν_f(p,h) - ω_f(p)²` at a prime `p`.** -/
theorem cf_prime (f : ℤ[X]) {p : ℕ} (hp : p.Prime) (h : ℤ) :
    cf f p h = (p : ℤ) * nu f p h - (omega f p : ℤ) ^ 2 := by
  unfold cf
  rw [hp.divisors, Finset.sum_pair hp.one_lt.ne]
  simp [nu_one, omega_one, moebius_apply_prime hp, Nat.div_self hp.pos]
  ring

/-- `b` is multiplicative: `b(mn) = b(m) b(n)` for coprime nonzero `m, n`. -/
theorem bfun_mul (f : ℤ[X]) {m n : ℕ} (hm : m ≠ 0) (hn : n ≠ 0) (hmn : m.Coprime n) :
    bfun f (m * n) = bfun f m * bfun f n := by
  unfold bfun
  rw [Nat.primeFactors_mul hm hn, Finset.prod_union hmn.disjoint_primeFactors]

/-- `b(1) = 1`. -/
theorem bfun_one (f : ℤ[X]) : bfun f 1 = 1 := by
  unfold bfun
  simp

/-- `b(p) = (p - ω_f(p))^{-2}` at a prime. -/
theorem bfun_prime (f : ℤ[X]) {p : ℕ} (hp : p.Prime) :
    bfun f p = (((p : ℝ) - omega f p) ^ 2)⁻¹ := by
  unfold bfun
  rw [hp.primeFactors, Finset.prod_singleton]

/-- **`F_h` is multiplicative**: `F_h(mn) = F_h(m) F_h(n)` for coprime `m, n`. -/
theorem Fterm_mul (f : ℤ[X]) (h : ℤ) {m n : ℕ} (hmn : m.Coprime n) :
    Fterm f h (m * n) = Fterm f h m * Fterm f h n := by
  unfold Fterm
  rcases Nat.eq_zero_or_pos m with rfl | hm
  · simp
  rcases Nat.eq_zero_or_pos n with rfl | hn
  · simp
  rw [isMultiplicative_moebius.map_mul_of_coprime hmn, bfun_mul f hm.ne' hn.ne' hmn, cf_mul f h hmn]
  push_cast
  ring

theorem Fterm_one (f : ℤ[X]) (h : ℤ) : Fterm f h 1 = 1 := by
  unfold Fterm
  simp [bfun_one, cf_one]

theorem Fterm_zero (f : ℤ[X]) (h : ℤ) : Fterm f h 0 = 0 := by
  unfold Fterm
  simp

/-- `F_h(p) = g_p(h)` at a prime: the summand at a prime is the Euler-factor correction. -/
theorem Fterm_prime (f : ℤ[X]) (h : ℤ) {p : ℕ} (hp : p.Prime) : Fterm f h p = gfac f p h := by
  unfold Fterm gfac
  rw [moebius_apply_prime hp, bfun_prime f hp, cf_prime f hp h]
  push_cast
  ring

/-- `F_h(p^k) = 0` for `k ≥ 2`: the summand vanishes off squarefree numbers. -/
theorem Fterm_prime_pow (f : ℤ[X]) (h : ℤ) {p k : ℕ} (hp : p.Prime) (hk : 2 ≤ k) :
    Fterm f h (p ^ k) = 0 := by
  unfold Fterm
  have : moebius (p ^ k) = 0 := by
    rw [moebius_apply_prime_pow hp (by omega)]
    simp [show k ≠ 1 by omega]
  simp [this]

end PairSingularSeries
