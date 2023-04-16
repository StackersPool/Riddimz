(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-non-fungible-token riddimz uint)

(define-constant MINT_PRICE u1000000)
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_OWNER_ONLY (err u100))
(define-constant ERR_NOT_TOKEN_OWNER (err u101))

(define-data-var last-token-id uint u0)

(define-read-only (get-last-token-id) 
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (id uint)) 
  (ok none)
)

(define-read-only (get-owner (id uint))
  (ok (nft-get-owner? riddimz id))
)

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq sender tx-sender) ERR_NOT_TOKEN_OWNER)
    ;; #[filter(id, recipient)]
    (try! (nft-transfer? riddimz id sender recipient))
    (ok true)
  )
)

(define-public (mint (recipient principal))
  (let 
    (
      (id (+ (var-get last-token-id) u1))
    )
    ;; #[filter(id, recipient)]
    (try! (stx-transfer? MINT_PRICE recipient (as-contract CONTRACT_OWNER)))
    (try! (nft-mint? riddimz id recipient))
    (var-set last-token-id id)
    (ok id)
  )
)

