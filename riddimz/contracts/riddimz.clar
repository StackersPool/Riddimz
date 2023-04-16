
;; title: riddimz
;; version:
;; summary: a web3 karaoke platform
;; description:

(use-trait nft-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-constant contract-address tx-sender)
(define-constant ERR_ALREADY_REGISTERED (err u100))
(define-constant ERR_NOT_REGISTERED (err u101))
(define-constant ERR_USERS_HAS_NO_POST (err u102))
(define-constant ERR_ALREADY_A_VIP_USER (err u103))
(define-constant ERR_DONT_HAVE_VIP_NFT (err u104))

(define-map registered-users principal { registered: bool, vip: bool })
(define-map users-content principal { posts: uint })

(define-public (register) 
  (begin 
    (asserts! (is-none (map-get? registered-users tx-sender)) ERR_ALREADY_REGISTERED)
    (map-set registered-users tx-sender { registered: true, vip: false })
    (ok true)
  )
)

;; the asset must be a music or video nft
(define-public (post-asset (asset <nft-trait>) (type (string-ascii 5))) 
  (let
    (
      (user (unwrap! (map-get? registered-users tx-sender) ERR_NOT_REGISTERED))
      (number-of-posts (unwrap! (map-get? users-content tx-sender) ERR_USERS_HAS_NO_POST))
      (new (merge number-of-posts { posts: (+ (get posts number-of-posts) u1) }))
    )
    (asserts! (is-eq (get registered user) true) ERR_NOT_REGISTERED)
    ;; #[filter(asset)]
    (map-set users-content (contract-of asset) new)
    (ok true)
  )
)

(define-public (to-vip (nft-id uint)) 
  (let 
    (
      (user (unwrap! (map-get? registered-users tx-sender) ERR_NOT_REGISTERED))
    )
    (asserts! (is-eq (get vip user) true) ERR_ALREADY_A_VIP_USER)
    (asserts! (is-ok (contract-call? .test-nft get-owner nft-id)) ERR_DONT_HAVE_VIP_NFT)
    (map-set registered-users tx-sender { registered: true, vip: true })
    (stx-transfer? u100000000 tx-sender contract-address)
  )
)

(define-public (create-karaoke (caption (string-ascii 250)) (attachment (string-ascii 100))) 
  (ok (print {event: "create-karaoke", publisher: tx-sender, caption: caption, attachment: attachment}))
)